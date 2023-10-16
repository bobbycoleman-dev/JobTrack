import { useEffect } from "react";
import Dashboard from "./Dashboard";
import Interviews from "./Interviews";
import Settings from "./Settings";

import NavMenu from "../Components/NavMenu";

const Main = ({ view }) => {
	const renderView = () => {
		switch (view) {
			case "interviews":
				return <Interviews />;
			case "settings":
				return <Settings />;
			default:
				return <Dashboard />;
		}
	};
	return (
		<div className="ml-48 p-3">
			<NavMenu />
			{renderView()}
		</div>
	);
};

export default Main;
