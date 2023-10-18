import { useEffect, useState } from "react";
import AppTableRow from "./AppTableRow";

const ApplicationTable = ({ appsList }) => {
	const [filteredList, setFilteredList] = useState([]);
	const [sortedList, setSortedList] = useState([]);
	const [listState, setListState] = useState("default");
	const [rerender, setRerender] = useState(false);

	useEffect(() => {
		renderList();
	}, [rerender]);

	const handleSearch = (e) => {
		const value = e.target.value.toLowerCase();
		let newList;
		switch (e.target.name) {
			case "companySearch":
				newList = appsList.filter((app) => app.companyName.toLowerCase().includes(value));
				break;
			case "positionSearch":
				newList = appsList.filter((app) => app.positionTitle.toLowerCase().includes(value));
				break;
			default:
				break;
		}
		setListState("filter");
		setFilteredList(newList);
		setRerender(!rerender);
	};

	const handleSort = (e) => {
		let newList;
		switch (e.target.value) {
			case "dateNew":
				newList = appsList.sort((a, b) => (a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0));
				break;
			case "dateOld":
				newList = appsList.sort((a, b) => (a.createdAt > b.createdAt ? 1 : a.createdAt < b.createdAt ? -1 : 0));
				break;
			case "companyAZ":
				newList = appsList.sort((a, b) => (a.companyName.toLowerCase() < b.companyName.toLowerCase() ? -1 : 1));
				break;
			case "companyZA":
				newList = appsList.sort((a, b) => (a.companyName.toLowerCase() > b.companyName.toLowerCase() ? -1 : 1));
				break;
			case "positionAZ":
				newList = appsList.sort((a, b) =>
					a.positionTitle.toLowerCase() < b.positionTitle.toLowerCase() ? -1 : 1
				);
				break;
			case "positionZA":
				newList = appsList.sort((a, b) =>
					a.positionTitle.toLowerCase() > b.positionTitle.toLowerCase() ? -1 : 1
				);
				break;
			default:
				break;
		}
		setSortedList(newList);
		setListState("sort");
		setRerender(!rerender);
	};

	const renderList = () => {
		switch (listState) {
			case "filter":
				return filteredList.map((app, idx) => {
					return <AppTableRow key={idx} app={app} />;
				});
			case "sort":
				return sortedList.map((app, idx) => {
					return <AppTableRow key={idx} app={app} />;
				});
			default:
				return appsList.map((app, idx) => {
					return <AppTableRow key={idx} app={app} />;
				});
		}
	};

	return (
		<div className="overflow-x-auto h-[88%] p-3 border border-primary rounded-lg shadow-xl">
			<div className="flex justify-evenly mb-3">
				<select name="sort" className="select select-bordered w-64" onChange={handleSort}>
					<option value="dateNew">Newest Submitted</option>
					<option value="dateOld">Oldest Submitted</option>
					<option value="companyAZ">Company A-Z</option>
					<option value="companyZA">Company Z-A</option>
					<option value="positionAZ">Position A-Z</option>
					<option value="positionZA">Position Z-A</option>
				</select>
				<input
					type="search"
					name="companySearch"
					className="input input-bordered w-64"
					placeholder="Search Company"
					onChange={handleSearch}
				/>
				<input
					type="search"
					name="positionSearch"
					className="input input-bordered w-64"
					placeholder="Search Position"
					onChange={handleSearch}
				/>
			</div>
			<table className="table  table-pin-rows">
				<thead>
					<tr>
						<th>Company</th>
						<th>Position</th>
						<th>Company Website</th>
						<th>Position Website</th>
						<th>Location</th>
						<th>Type</th>
						<th>Status</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{renderList()}</tbody>
			</table>
		</div>
	);
};

export default ApplicationTable;
