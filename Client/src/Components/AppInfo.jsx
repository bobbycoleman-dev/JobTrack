import React from "react";

const AppInfo = ({ title, info }) => {
	return (
		<div className="text-center space-y-3">
			<p className="underline">{title}</p>
			{title.includes("Website") ? (
				<p className="text-xl text-primary">
					<a href={info}>{info ? "Visit Website" : "Not Provided"}</a>
				</p>
			) : (
				<p className="text-xl text-primary">{info ? info : "Not Provided"}</p>
			)}
		</div>
	);
};

export default AppInfo;
