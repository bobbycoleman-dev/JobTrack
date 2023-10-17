import Dashboard from "./Dashboard";
import Interviews from "./Interviews";
import Settings from "./Settings";

import NavMenu from "../Components/NavMenu";
import LogAppForm from "../Components/LogAppForm";
import ViewApplication from "./ViewApplication";
import { useParams } from "react-router-dom";

const Main = ({ view }) => {
	const { appId } = useParams();

	const renderView = () => {
		switch (view) {
			case "interviews":
				return <Interviews />;
			case "settings":
				return <Settings />;
			case "logApp":
				return <LogAppForm />;
			case "viewApp":
				return <ViewApplication appId={appId} />;
			default:
				return <Dashboard />;
		}
	};
	return (
		<div className="ml-48 p-5 h-screen overflow-hidden">
			<NavMenu />
			{renderView()}
		</div>
	);
};

export default Main;
