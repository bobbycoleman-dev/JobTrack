import axios from "axios";
import { useEffect, useState } from "react";
import AppInfo from "../Components/AppInfo";

const ViewApplication = ({ appId }) => {
	const [app, setApp] = useState(null);
	useEffect(() => {
		try {
			axios.get(`https://localhost:7261/api/applications/view/${appId}`).then((res) => {
				const newDate = new Date(Date.parse(res.data.createdAt));
				const newData = { ...res.data, createdAt: `${newDate.toDateString()}` };
				setApp(newData);
			});
		} catch (err) {
			console.log(err);
		}
	}, []);
	return (
		<>
			{app && (
				<div className="flex flex-col items-center space-y-3">
					<p className="text-6xl">{app.positionTitle}</p>
					<p className="text-4xl">{app.companyName}</p>
					<p className="text-3xl underline">Status: {app.status}</p>

					<div className="space-y-3 w-1/2">
						<div className="flex gap-12 justify-evenly">
							<AppInfo title={"Location"} info={app.location} />
							<AppInfo title={"Position Type"} info={app.type} />
						</div>
						<div className="flex gap-12 justify-evenly">
							<AppInfo title={"Company Website"} info={app.companyWebsite} />
							<AppInfo title={"Application Website"} info={app.applicationWebsite} />
						</div>
						<AppInfo title={"Applied on"} info={app.createdAt} />
					</div>
					<p className="border-2 border-primary p-2 w-3/4 rounded-lg min-h-[300px] max-h-[400px] overflow-scroll">
						{app.notes ? app.notes : "No Notes"}
					</p>
					<div className="flex gap-12 justify-evenly">
						<AppInfo title={"Contact Email"} info={app.contactEmail} />
						<AppInfo title={"Next Interview"} info={"N/A"} />
					</div>
				</div>
			)}
		</>
	);
};

export default ViewApplication;
