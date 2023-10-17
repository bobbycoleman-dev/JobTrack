import axios from "axios";
import { useEffect, useState } from "react";

const ViewApplication = ({ appId }) => {
	const [app, setApp] = useState(null);
	useEffect(() => {
		try {
			axios.get(`https://localhost:7261/api/applications/view/${appId}`).then((res) => {
				console.log(res.data);
				setApp(res.data);
			});
		} catch (err) {
			console.log(err);
		}
	}, []);
	return (
		<>
			{app && (
				<div>
					<p>{app.companyName}</p>
					<p>{app.positionTitle}</p>
				</div>
			)}
		</>
	);
};

export default ViewApplication;
