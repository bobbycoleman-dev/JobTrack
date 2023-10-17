import { useState } from "react";
import AppTableRow from "./AppTableRow";

const ApplicationTable = ({ appsList }) => {
	const [filteredList, setFilteredList] = useState([]);

	const handleSearch = (e) => {
		const value = e.target.value.toLowerCase();
		let newList;
		switch (e.target.name) {
			case "companySearch":
				newList = appsList.filter((app) => app.companyName.toLowerCase().includes(value));
				break;
			case "positionSearch":
				console.log("this should not happen");
				newList = appsList.filter((app) => app.positionTitle.toLowerCase().includes(value));
				break;
			default:
				break;
		}
		setFilteredList(newList);
	};

	return (
		<div className="overflow-x-auto h-2/3">
			<div className="flex justify-evenly mb-3">
				<select name="sort" className="select select-bordered w-64">
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
						<th>View</th>
					</tr>
				</thead>
				<tbody>
					{filteredList.length > 0
						? filteredList.map((app, idx) => {
								return <AppTableRow key={idx} app={app} />;
						  })
						: appsList.map((app, idx) => {
								return <AppTableRow key={idx} app={app} />;
						  })}
				</tbody>
			</table>
		</div>
	);
};

export default ApplicationTable;
