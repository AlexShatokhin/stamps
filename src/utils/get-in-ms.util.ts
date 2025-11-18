export function getInMs(time: string): number {
	const timeRange = time.match(/^(\d+)([smhd])$/);
	if (!timeRange) {
		throw new Error('Invalid time format');
	}
	const timeValue = parseInt(timeRange[1], 10);
	switch (timeRange[2]) {
		case 's':
			return timeValue;
		case 'm':
			return timeValue * 60;
		case 'h':
			return timeValue * 60 * 60;
		case 'd':
			return timeValue * 24 * 60 * 60;
		default:
			throw new Error('Invalid time unit');
	}
}
