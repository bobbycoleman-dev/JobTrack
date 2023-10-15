import BarChartExample from "../Components/BarChartExample";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

const Dashboard = () => {
	return (
		<div>
			<h2>Dashboard</h2>
			<BarChartExample />
		</div>
	);
};

export default Dashboard;
