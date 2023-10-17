const TotalApplications = ({ totalApps }) => {
	return (
		<div className="w-[12rem] h-[12rem] bg-primary text-primary-content rounded-lg p-4">
			<h3 className="text-center">Total Apps Submitted</h3>
			<div className="flex flex-col justify-center items-center h-3/4">
				<p className="text-7xl">{totalApps}</p>
			</div>
		</div>
	);
};

export default TotalApplications;
