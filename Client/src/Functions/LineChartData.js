export const createLineChartData = (appList) => {
	const sortedList = appList.sort((a, b) => (a.createdAt > b.createdAt ? 1 : a.createdAt < b.createdAt ? -1 : 0));
	const dataList = [];
	const map = {};

	sortedList.map((app) => {
		const appDate = app.createdAt.slice(5, 10).replace("-", "/");
		if (map[appDate]) {
			map[appDate]++;
		} else {
			map[appDate] = 1;
		}
	});

	for (const key of Object.keys(map)) {
		const obj = {
			date: key,
			apps: map[key]
		};
		dataList.push(obj);
	}

	return dataList;
};
