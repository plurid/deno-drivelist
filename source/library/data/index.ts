export interface Mountpoint {
	path: string;
	label: string | null;
}

export interface Drive {
    blockSize: number;
	busType: string;
	busVersion: null;
	description: string;
	device: string;
	devicePath: string | null;
	enumerator: string;
	error: null;
	isCard: null;
	isReadOnly: boolean;
	isRemovable: boolean;
	isSCSI: boolean | null;
	isSystem: boolean;
	isUAS: null;
	isUSB: boolean | null;
	isVirtual: boolean | null;
	logicalBlockSize: number;
	mountpoints: Mountpoint[];
	raw: string;
	size: number | null;
	partitionTableType: 'mbr' | 'gpt' | null;
}
