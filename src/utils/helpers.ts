export function getRandomValue(array: any[]) {
	if (array.length === 0) {
		throw new Error('Array of arguments cannot be empty');
	}
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}
