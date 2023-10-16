import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import ApplicationTable from "../Components/ApplicationTable";
import axios from "axios";
import DailyTracker from "../Components/DailyTracker";
import LogAppForm from "../Components/LogAppForm";

const Dashboard = () => {
	const {
		state: { user }
	} = useContext(AuthContext);
	const [allApps, setAllApps] = useState([]);
	const [completedToday, setCompletedToday] = useState(0);

	const date = new Date().toDateString();

	useEffect(() => {
		if (user) {
			axios.get(`https://localhost:7261/api/applications/${user.userId}`).then((res) => {
				console.log(res.data[0].createdAt);
				setAllApps(res.data);
			});
		}
	}, [user]);

	return (
		<>
			{user ? (
				<div className="h-screen space-y-20">
					<h2 className="text-center text-3xl">Hello, {user && user.firstName}!</h2>
					<div>
						<DailyTracker dailyGoal={user.dailySubmitGoal} />
					</div>
					<div className="">
						<ApplicationTable appsList={allApps} />
					</div>
					<LogAppForm />
				</div>
			) : (
				<span className="loading loading-spinner loading-lg"></span>
			)}
		</>
	);
};

export default Dashboard;
