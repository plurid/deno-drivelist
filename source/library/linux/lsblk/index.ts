// deno-lint-ignore-file no-explicit-any

/*
 * Copyright 2018 Balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { execFile } from 'node:child_process';
import { promises as fs } from 'node:fs';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';

import { Drive } from '../../data/index.ts';
import { parse as parseJSON } from './json.ts';
import { parse as parsePairs } from './pairs.ts';



const execFileAsync = promisify(execFile);

const DISK_PATH_DIR = '/dev/disk/by-path/';

let SUPPORTS_JSON = true;
let SUPPORTS_PTTYPE = true;

export function getPartitionTableType(
	pttype?: 'gpt' | 'dos',
): 'gpt' | 'mbr' | null {
	if (pttype === 'gpt') {
		return 'gpt';
	} else if (pttype === 'dos') {
		return 'mbr';
	}
	return null;
}

async function getDevicePaths(): Promise<Map<string, string>> {
	const mapping = new Map();
	for (const filename of await fs.readdir(DISK_PATH_DIR)) {
		const linkPath = join(DISK_PATH_DIR, filename);
		let link: string;
		try {
			link = await fs.readlink(linkPath);
		} catch (_error: any) {
			continue;
		}
		const devicePath = resolve(DISK_PATH_DIR, link);
		mapping.set(devicePath, linkPath);
	}
	return mapping;
}

async function addDevicePaths(devices: Drive[]): Promise<void> {
	const devicePaths = await getDevicePaths();
	for (const device of devices) {
		device.devicePath = devicePaths.get(device.device) || null;
	}
}

async function getOutput(command: string, ...args: string[]) {
	const { stdout } = await execFileAsync(command, args);
	return stdout;
}

async function lsblkJSON(): Promise<Drive[]> {
	return parseJSON(
		await getOutput(
			'lsblk',
			'--bytes',
			'--all',
			'--json',
			'--paths',
			'--output-all',
		),
	);
}

async function getLsblkPairsOutput() {
	if (SUPPORTS_PTTYPE) {
		try {
			return await getOutput(
				'lsblk',
				'--bytes',
				'--all',
				'--pairs',
				'-o',
				'+pttype',
			);
		} catch (_error: any) {
			SUPPORTS_PTTYPE = false;
		}
	}
	return await getOutput('lsblk', '--bytes', '--all', '--pairs');
}

async function lsblkPairs(): Promise<Drive[]> {
	return parsePairs(await getLsblkPairsOutput());
}

async function $lsblk(): Promise<Drive[]> {
	if (SUPPORTS_JSON) {
		try {
			return await lsblkJSON();
		} catch (_error: any) {
			SUPPORTS_JSON = false;
		}
	}
	return await lsblkPairs();
}

export async function lsblk(): Promise<Drive[]> {
	const drives = await $lsblk();
	try {
		await addDevicePaths(drives);
	} catch (_error: any) {
		// Couldn't add device paths
	}
	return drives;
}
