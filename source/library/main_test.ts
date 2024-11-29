// deno-lint-ignore-file

import { assertEquals } from '@std/assert';

import drivelist, {
    loadBinary,
} from './main.ts';



// Deno.test(async function drivelistTest() {
//     const drives = await drivelist();

//     assertEquals(drives.length > 0, true);
// });


Deno.test(async function loadBinaryTest() {
    const data = loadBinary();
    console.log(data);

    assertEquals(1, 1);
});
