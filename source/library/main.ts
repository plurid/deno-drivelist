// deno-lint-ignore-file

import {
    Drive,
} from './data/index.ts';

import parseDarwin from './darwin/index.ts';
import linux from './linux/index.ts';



function readCString(ptr: Deno.PointerValue): string {
    if (!ptr) {
        return '';
    }

    const decoder = new TextDecoder();
    const view = new Deno.UnsafePointerView(ptr);

    const bytes = [];
    let offset = 0;
    while (true) {
        const byte = view.getUint8(offset++);
        if (byte === 0) break; // Null terminator
        bytes.push(byte);
    }

    return decoder.decode(new Uint8Array(bytes));
}

export const loadBinary = (): any => {
    let libSuffix = '';
    switch (Deno.build.os) {
        case 'windows':
            libSuffix = 'dll';
            break;
        case 'darwin':
            libSuffix = 'dylib';
            break;
        default:
            return;
    }

    const libName = `./lib/libdrivelist.${libSuffix}`;
    const dylib = Deno.dlopen(
        libName,
        {
            'drivelist': { parameters: [], result: 'pointer' },
            'free_drivelist': { parameters: ['pointer'], result: 'void' },
        } as const,
    );

    const jsonStrPtr = dylib.symbols.drivelist();
    const jsonStr = readCString(jsonStrPtr);
    const devices = JSON.parse(jsonStr);

    dylib.close();

    return devices;
}


const drivelist: () => Promise<Drive[]> = async () => {
    switch (Deno.build.os) {
        case 'windows':
            return await loadBinary();
        case 'darwin':
    		const disks = await loadBinary();
            parseDarwin(disks);
            return disks;
        case 'linux':
            return await linux();
        default:
            throw new Error('drivelist unsupported platform');
    }
}

export default drivelist;
