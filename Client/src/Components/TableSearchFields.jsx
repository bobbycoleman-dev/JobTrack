import React from "react";

const TableSearchFields = ({ handleSearchSort }) => {
	const handleChange = (type, e) => {
		if (type == "search") {
			handleSearchSort(e.target.value, e.target.name);
		} else if (type == "sort") {
			handleSearchSort("", "", e.target.value);
		}
	};
	return (
		<div className="flex justify-evenly mb-3">
			<select name="sort" className="select select-bordered w-64" onChange={(e) => handleChange("sort", e)}>
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
				onChange={(e) => handleChange("search", e)}
			/>
			<input
				type="search"
				name="positionSearch"
				className="input input-bordered w-64"
				placeholder="Search Position"
				onChange={(e) => handleChange("search", e)}
			/>
			<select
				name="statusSearch"
				className="select select-bordered w-64"
				onChange={(e) => handleChange("search", e)}>
				<option value="all">All Statuses</option>
				<option value="applied">Applied</option>
				<option value="contacted">Contacted</option>
				<option value="interview">Interview</option>
				<option value="post-interview">Post-Interview</option>
				<option value="negotiation">Negotiation</option>
				<option value="rejected">Rejected</option>
				<option value="declined">Declined</option>
			</select>
		</div>
	);
};

export default TableSearchFields;
