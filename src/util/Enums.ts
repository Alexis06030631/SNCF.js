export function createEnum(keys:any) {
	const obj:any = {};
	for (const [index, key] of keys.entries()) {
		if (key === null) continue;
		obj[key] = index;
		obj[index] = key;
	}
	return obj;
}