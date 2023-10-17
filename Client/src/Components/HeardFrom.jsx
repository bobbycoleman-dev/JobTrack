import React from "react";

const HeardFrom = ({ totalApps }) => {
	return (
		<div className="w-[12rem] h-[12rem] bg-primary text-primary-content rounded-lg p-4">
			<h3 className="text-center">Heard Back From</h3>
			<div className="flex flex-col justify-center items-center h-3/4">
				<p className="text-7xl">{totalApps}</p>
			</div>
		</div>
	);
};

export default HeardFrom;
