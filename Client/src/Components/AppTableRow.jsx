import { Link } from "react-router-dom";
import { Eye, CalendarPlus } from "react-bootstrap-icons";
import { useState } from "react";
import axios from "axios";

const AppTableRow = ({ app, handleUpdateStatus }) => {
	const handleChange = async (e) => {
		handleUpdateStatus(app.applicationId, e.target.value);
	};

	return (
		<tr className="hover cursor-default">
			<td>{app.companyName}</td>
			<td>{app.positionTitle}</td>
			<td>{app.location}</td>
			<td>{app.type}</td>
			<td>
				<select
					name="Status"
					value={app.status}
					className="select select-sm select-bordered w-full"
					onChange={handleChange}>
					<option value="Applied">Applied</option>
					<option value="Contacted">Contacted</option>
					<option value="Interview">Interview</option>
					<option value="Post-Interview">Post-Interview</option>
					<option value="Negotiation">Negotiation</option>
					<option value="Rejected">Rejected</option>
					<option value="Declined">Declined</option>
				</select>
			</td>
			<td className="underline">
				<a href={app.applicationWebsite} target="_blank">
					View Position
				</a>
			</td>
			<td className="underline">
				<a href={app.companyWebsite} target="_blank">
					View Company
				</a>
			</td>
			<td className="text-xl text-primary">
				<CalendarPlus />
			</td>
			<td className="text-xl text-primary cursor-pointer">
				<Link to={`/applications/${app.applicationId}`}>
					<Eye />
				</Link>
			</td>
		</tr>
	);
};

export default AppTableRow;
