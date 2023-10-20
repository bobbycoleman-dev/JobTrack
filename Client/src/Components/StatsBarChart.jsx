import { useEffect, useState } from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from "recharts";

const StatsBarChart = ({ stats }) => {
	const [chartData, setChartData] = useState([]);
	const [color, setColor] = useState(JSON.parse(localStorage.getItem("theme")));

	useEffect(() => {
		setColor(JSON.parse(localStorage.getItem("theme")));
	}, [color]);

	useEffect(() => {
		const data = [
			{
				status: "Applied",
				apps: 0
			},
			{
				status: "Contacted",
				apps: 0
			},
			{
				status: "Rejected",
				apps: 0
			},
			{
				status: "Interview",
				apps: 0
			},
			{
				status: "Post-Interview",
				apps: 0
			},
			{
				status: "Declined",
				apps: 0
			}
		];
		for (let i = 0; i < stats.length; i++) {
			data[i].apps = stats[i];
		}
		setChartData(data);
	}, [stats]);

	return (
		<ResponsiveContainer width="50%" height="100%">
			<BarChart data={chartData}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="status" />
				<YAxis />
				<Tooltip />
				<Bar dataKey="apps" fill={color.primary} />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default StatsBarChart;
