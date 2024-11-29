/*
 * Copyright 2016 Balena.io
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

import {
    Drive,
} from '../data/index.ts';



function handleApfs(disks: Drive[]): void {
	const apfs: Drive[] = [];
	const other: Drive[] = [];
	for (const disk of disks) {
		if (disk.description === 'AppleAPFSMedia') {
			apfs.push(disk);
		} else {
			other.push(disk);
		}
	}
	for (const disk of apfs) {
		const source = other.find(
			(d) => d.devicePath === disk.devicePath && !d.isVirtual,
		);
		if (source !== undefined) {
			source.mountpoints.push(...disk.mountpoints);
			disk.isVirtual = true;
		}
	}
}


export default handleApfs;
