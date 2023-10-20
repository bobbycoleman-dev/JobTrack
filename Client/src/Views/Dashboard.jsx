import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ApplicationTable from "../Components/ApplicationTable";
import DailyTracker from "../Components/DailyTracker";
import { AuthContext } from "../Context/AuthContext";
import InfoBlock from "../Components/InfoBlock";
import StatsBarChart from "../Components/StatsBarChart";
import StatsLineChart from "../Components/StatsLineChart";
import { useNavigate } from "react-router-dom";
import { createLineChartData } from "../Functions/LineChartData";

const Dashboard = () => {
	const navigate = useNavigate();
	const {
		state: { user }
	} = useContext(AuthContext);
	const [allApps, setAllApps] = useState([]);
	const [completedToday, setCompletedToday] = useState(0);
	const [applied, setApplied] = useState(0);
	const [heardFrom, setHeardFrom] = useState(0);
	const [interviews, setInterviews] = useState(0);
	const [postInterviews, setPostInterviews] = useState(0);
	const [rejected, setRejected] = useState(0);
	const [declined, setDeclined] = useState(0);
	const [topApp, setTopApp] = useState(null);
	const [lineChartData, setLineChartData] = useState([]);
	const [reload, setReload] = useState(false);

	const date = new Date().toISOString().slice(0, 10);

	useEffect(() => {
		if (user) {
			axios.get(`https://localhost:7261/api/applications/${user.userId}`).then((res) => {
				let count = 0;
				let appliedCount = 0;
				let heardCount = 0;
				let interviewCount = 0;
				let postInterviewCount = 0;
				let rejectedCount = 0;
				let declinedCount = 0;
				res.data.map((app) => {
					const appDate = app.createdAt.slice(0, 10);
					if (appDate.includes(date)) count++;
					switch (app.status) {
						case "Applied":
							appliedCount++;
							break;
						case "Contacted":
							heardCount++;
							break;
						case "Interview":
							interviewCount++;
							if (!topApp) {
								setTopApp(app);
							}
							break;
						case "Rejected":
							rejectedCount++;
							break;
						case "Declined":
							declinedCount++;
							break;
						case "Post-Interview":
							postInterviewCount++;
							if (topApp && topApp.status == "Interview") setTopApp(app);
							break;
						case "Negotiation":
							if (topApp && (topApp.status == "Interview" || topApp.status == "Post-Interview"))
								setTopApp(app);
							break;
					}
				});
				const newList = res.data.toSorted((a, b) => a - b);
				setCompletedToday(count);
				setApplied(appliedCount);
				setHeardFrom(heardCount);
				setInterviews(interviewCount);
				setPostInterviews(postInterviewCount);
				setRejected(rejectedCount);
				setDeclined(declinedCount);
				setLineChartData(createLineChartData(res.data));
				setAllApps(newList);
			});
		}
	}, [user, topApp, reload]);

	const reloadData = () => {
		setReload(!reload);
	};

	return (
		<>
			{user ? (
				<div className="h-full space-y-12 pb-20">
					<h2 className="text-center text-3xl">Hello, {user && user.firstName}!</h2>
					<div className="flex flex-col justify-between h-full">
						<div className="flex flex-col h-1/2 justify-between mb-4">
							<div className="flex justify-evenly">
								<InfoBlock title={"Total Apps Submitted"} totalApps={allApps.length} />
								<InfoBlock title={"Heard Back From"} totalApps={heardFrom} />
								<DailyTracker dailyGoal={user.dailySubmitGoal} submittedToday={completedToday} />
								<InfoBlock title={"Interviews Scheduled"} totalApps={interviews} />
								<InfoBlock title={"Rejected Applications"} totalApps={rejected} />
							</div>
							{topApp && (
								<div
									className="bg-primary text-primary-content rounded-xl py-3 w-1/2 mx-auto cursor-pointer"
									onClick={() => navigate(`/applications/${topApp.applicationId}`)}>
									<p className="text-center text-xl font-bold underline">Top Application</p>
									<div className="flex gap-4 justify-center">
										<p>
											<span className="underline">Position:</span> {topApp.positionTitle}
										</p>
										<p>
											<span className="underline">Company:</span> {topApp.companyName}
										</p>
										<p>
											<span className="underline">Status:</span> {topApp.status}
										</p>
									</div>
								</div>
							)}
							<div className="flex -ml-12 h-1/2">
								<StatsLineChart appData={lineChartData} />
								<StatsBarChart
									stats={[applied, heardFrom, rejected, interviews, postInterviews, declined]}
								/>
							</div>
						</div>
						<div className="h-1/2 border border-primary rounded-lg shadow-xl pt-2 ">
							<ApplicationTable appsList={allApps} reloadData={reloadData} />
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
