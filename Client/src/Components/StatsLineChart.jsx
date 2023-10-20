import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

const StatsLineChart = ({ appData }) => {
	const [color, setColor] = useState(JSON.parse(localStorage.getItem("theme")));

	useEffect(() => {
		setColor(JSON.parse(localStorage.getItem("theme")));
	}, [color]);

	return (
		<ResponsiveContainer width="50%" height="100%">
			<LineChart width={730} height={250} data={appData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Line type="monotone" dataKey="apps" stroke={color.primary} />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default StatsLineChart;
