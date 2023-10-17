import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ApplicationTable from "../Components/ApplicationTable";
import DailyTracker from "../Components/DailyTracker";
import { AuthContext } from "../Context/AuthContext";
import TotalApplications from "../Components/TotalApplications";
import HeardFrom from "../Components/HeardFrom";

const Dashboard = () => {
	const {
		state: { user }
	} = useContext(AuthContext);
	const [allApps, setAllApps] = useState([]);
	const [completedToday, setCompletedToday] = useState(0);
	const [heardFrom, setHeardFrom] = useState(0);

	const date = new Date().toISOString().slice(0, 10);

	useEffect(() => {
		if (user) {
			axios.get(`https://localhost:7261/api/applications/${user.userId}`).then((res) => {
				let count = 0;
				let heardCount = 0;
				res.data.map((app) => {
					const appDate = app.createdAt.slice(0, 10);
					if (appDate.includes(date)) count++;
					if (app.status == "Contacted") heardCount++;
				});
				setCompletedToday(count);
				setHeardFrom(heardCount);
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
						<div className="flex gap-6 h-1/2">
							<DailyTracker dailyGoal={user.dailySubmitGoal} submittedToday={completedToday} />
							<TotalApplications totalApps={allApps.length} />
							<HeardFrom totalApps={heardFrom} />
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
