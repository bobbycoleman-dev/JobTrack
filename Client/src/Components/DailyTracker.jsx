const DailyTracker = ({ dailyGoal, submittedToday }) => {
	return (
		<div
			className="radial-progress bg-primary text-primary-content border-4 border-primary"
			style={{
				"--value": `${(submittedToday / dailyGoal) * 100}`,
				"--size": "12rem",
				"--thickness": "1.5rem"
			}}>
			<p className="text-center text-xl">
				{submittedToday} / {dailyGoal}
			</p>{" "}
			<p className="text-center">Submitted Today</p>
		</div>
	);
};

export default DailyTracker;
