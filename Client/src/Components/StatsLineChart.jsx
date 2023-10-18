import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from "recharts";
const data = [
	{
		date: "10/12",
		apps: 5
	},
	{
		date: "10/13",
		apps: 4
	},
	{
		date: "10/14",
		apps: 6
	},
	{
		date: "10/15",
		apps: 10
	},
	{
		date: "10/16",
		apps: 15
	},
	{
		date: "10/17",
		apps: 12
	},
	{
		date: "10/18",
		apps: 2
	}
];
const StatsLineChart = ({ appData }) => {
	return (
		<ResponsiveContainer width="50%" height="100%">
			<LineChart width={730} height={250} data={appData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Line type="monotone" dataKey="apps" stroke="#8884d8" />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default StatsLineChart;
