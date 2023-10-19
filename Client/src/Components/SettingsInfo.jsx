import React from "react";

const SettingsInfo = ({ title, info }) => {
	return (
		<div className="flex gap-5">
			<p className="underline w-1/4 text-end">{title}:</p>
			<p className="w-1/2">{info ? info : "None Provided"}</p>
		</div>
	);
};

export default SettingsInfo;
