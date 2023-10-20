import { CalendarPlus } from "react-bootstrap-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import AppInfo from "../Components/AppInfo";

const ViewApplication = ({ appId }) => {
	const [app, setApp] = useState(null);
	const [updatedNotes, setUpdatedNotes] = useState("");
	const [isEditingNotes, setIsEditingNotes] = useState(false);
	useEffect(() => {
		try {
			axios.get(`https://localhost:7261/api/applications/view/${appId}`).then((res) => {
				const newDate = new Date(Date.parse(res.data.createdAt));
				const newData = { ...res.data, createdAt: `${newDate.toDateString()}` };
				setApp(newData);
				setUpdatedNotes(newData.notes);
			});
		} catch (err) {
			console.log(err);
		}
	}, []);

	const updateAppStatus = async (e) => {
		try {
			const updatedApp = await axios({
				url: `https://localhost:7261/api/applications/update/status/${app.applicationId}/${e.target.value}`,
				method: "post",
				data: e.target.value,
				ContentType: "application/json"
			});
			const newDate = new Date(Date.parse(updatedApp.data.createdAt));
			const newData = { ...updatedApp.data, createdAt: `${newDate.toDateString()}` };
			setApp(newData);
			setUpdatedNotes(newData.notes);
		} catch (err) {
			console.log(err);
		}
	};

	const handleNotesChange = (e) => {
		if (app.notes != e.target.value) {
			setIsEditingNotes(true);
			setUpdatedNotes(e.target.value);
		} else {
			setIsEditingNotes(false);
		}
	};

	const updateNotes = async () => {
		try {
			const updatedApp = await axios({
				url: `https://localhost:7261/api/applications/update/notes/${app.applicationId}`,
				method: "post",
				data: { UpdateNotes: updatedNotes },
				ContentType: "application/json"
			});
			const newDate = new Date(Date.parse(updatedApp.data.createdAt));
			const newData = { ...updatedApp.data, createdAt: `${newDate.toDateString()}` };
			setApp(newData);
			setUpdatedNotes(newData.notes);
			setIsEditingNotes(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{app && (
				<div className="flex flex-col items-center space-y-3">
					<p className="text-6xl">{app.positionTitle}</p>
					<p className="text-4xl">{app.companyName}</p>
					<p className="text-3xl underline flex flex-col gap-2 items-center">
						Status
						<select
							name="Status"
							value={app.status}
							className="select select-bordered text-2xl text-center"
							onChange={updateAppStatus}>
							<option value="Applied">Applied</option>
							<option value="Contacted">Contacted</option>
							<option value="Interview">Interview</option>
							<option value="Post-Interview">Post-Interview</option>
							<option value="Negotiation">Negotiation</option>
							<option value="Rejected">Rejected</option>
							<option value="Declined">Declined</option>
						</select>
					</p>

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
					<textarea
						className="textarea border-2 border-primary p-2 w-3/4 rounded-lg min-h-[300px] max-h-[300px] overflow-scroll"
						value={updatedNotes ? updatedNotes : "No Notes"}
						onChange={handleNotesChange}></textarea>
					{isEditingNotes && (
						<button className="btn btn-primary" onClick={updateNotes}>
							Save Changes
						</button>
					)}
					<div className="flex gap-12 justify-evenly">
						<AppInfo title={"Contact Email"} info={app.contactEmail} />
						<AppInfo title={"Next Interview"} info={"N/A"} />
					</div>
					<div className="pt-5">
						<button className="btn btn-primary">
							<CalendarPlus /> Schedule Interview
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default ViewApplication;
