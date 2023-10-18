import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ApplicationTable from "../Components/ApplicationTable";
import DailyTracker from "../Components/DailyTracker";
import { AuthContext } from "../Context/AuthContext";
import InfoBlock from "../Components/InfoBlock";

const Dashboard = () => {
	const {
		state: { user }
	} = useContext(AuthContext);
	const [allApps, setAllApps] = useState([]);
	const [completedToday, setCompletedToday] = useState(0);
	const [heardFrom, setHeardFrom] = useState(0);
	const [interviews, setInterviews] = useState(0);

	const date = new Date().toISOString().slice(0, 10);

	useEffect(() => {
		if (user) {
			axios.get(`https://localhost:7261/api/applications/${user.userId}`).then((res) => {
				let count = 0;
				let heardCount = 0;
				let interviewCount = 0;
				res.data.map((app) => {
					const appDate = app.createdAt.slice(0, 10);
					if (appDate.includes(date)) count++;
					if (app.status == "Contacted") heardCount++;
					if (app.status == "Interview") interviewCount++;
				});
				setCompletedToday(count);
				setHeardFrom(heardCount);
				setInterviews(interviewCount);
				setAllApps(res.data);
			});
		}
	}, [user]);

	return (
		<>
			{user ? (
				<div className="h-full space-y-12 mb-12">
					<h2 className="text-center text-3xl">Hello, {user && user.firstName}!</h2>
					<div className="flex flex-col justify-between h-full">
						<div className="flex justify-evenly h-1/2">
							<DailyTracker dailyGoal={user.dailySubmitGoal} submittedToday={completedToday} />
							<InfoBlock title={"Total Apps Submitted"} totalApps={allApps.length} />
							<InfoBlock title={"Heard Back From"} totalApps={heardFrom} />
							<InfoBlock title={"Interviews Scheduled"} totalApps={interviews} />
							<InfoBlock title={"Rejected Applications"} totalApps={0} />
						</div>
						<div className="h-1/2">
							<ApplicationTable appsList={allApps} />
						</div>
					</div>
				</div>
			) : (
				<span className="loading loading-spinner loading-lg"></span>
			)}
		</>
	);
};

export default Dashboard;
