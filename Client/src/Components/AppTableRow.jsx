import { Link } from "react-router-dom";
import { Eye } from "react-bootstrap-icons";
const AppTableRow = ({ app }) => {
	return (
		<tr className="hover cursor-pointer">
			<td>{app.companyName}</td>
			<td>{app.positionTitle}</td>
			<td>{app.location}</td>
			<td>{app.type}</td>
			<td>{app.status}</td>
			<td>
				<a href={app.applicationWebsite} target="_blank">
					View Position
				</a>
			</td>
			<td>
				<a href={app.companyWebsite} target="_blank">
					View Company
				</a>
			</td>
			<td className="text-xl text-primary">
				<Link to={`/applications/${app.applicationId}`}>
					<Eye />
				</Link>
			</td>
		</tr>
	);
};

export default AppTableRow;
