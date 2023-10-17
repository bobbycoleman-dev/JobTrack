import { Link, useNavigate } from "react-router-dom";
import { Eye } from "react-bootstrap-icons";
const AppTableRow = ({ app }) => {
	return (
		<tr className="hover cursor-pointer">
			<td>{app.companyName}</td>
			<td>{app.positionTitle}</td>
			<td>
				<a href={app.companyWebsite} target="_blank">
					{app.companyWebsite}
				</a>
			</td>
			<td>
				<a href={app.applicationWebsite} target="_blank">
					{app.applicationWebsite}
				</a>
			</td>
			<td>{app.location}</td>
			<td>{app.type}</td>
			<td>{app.status}</td>
			<td className="text-xl text-primary">
				<Link to={`/applications/${app.applicationId}`}>
					<Eye />
				</Link>
			</td>
		</tr>
	);
};

export default AppTableRow;
