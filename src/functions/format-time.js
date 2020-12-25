const formatTime = (diff) => {
	let unitDiff, unit;

	if (Math.floor(diff / 31557600000) !== 0) {
		unitDiff = Math.floor(diff / 31557600000);
		unit = 'year';
	} else if (Math.floor(diff / 2592000000) !== 0) {
		unitDiff = Math.floor(diff / 2592000000);
		unit = 'month';
	} else if (Math.floor(diff / 86400000) !== 0) {
		unitDiff = Math.floor(diff / 86400000);
		unit = 'day';
	} else if (Math.floor(diff / 3600000) !== 0) {
		unitDiff = Math.floor(diff / 3600000);
		unit = 'hour';
	} else if (Math.floor(diff / 60000) !== 0) {
		unitDiff = Math.floor(diff / 60000);
		unit = 'minute';
	} else {
		unitDiff = Math.floor(diff / 1000);
		unit = 'second';
	}

	return unitDiff > 1 ? `${unitDiff} ${unit}s ago` : `1 ${unit} ago`;
};

export default formatTime;
