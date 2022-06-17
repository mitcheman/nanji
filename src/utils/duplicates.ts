const moment = require("moment");

export const duplicates = (arr) => {
	const count = {};
	for (let i = 0; i < arr.length; i++) {
		if (count[arr[i].date]) {
			arr[i].date = null;
		} else {
			count[arr[i].date] = 1;
		}
	}
	return arr;
};

export const duplicatesByMonth = (arr) => {
	const count = {};
	for (let i = 0; i < arr.length; i++) {
		if (count[moment(arr[i].date).format("YYYY-MM")]) {
			arr[i].date = null;
		} else {
			count[moment(arr[i].date).format("YYYY-MM")] = 1;
		}
	}
	return arr;
};
