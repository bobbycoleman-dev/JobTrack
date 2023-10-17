import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Views/Login";
import Main from "./Views/Main";
import Onboarding from "./Views/Onboarding";
import Register from "./Views/Register";

function App() {
	const navigate = useNavigate();
	useEffect(() => {
		if (JSON.parse(localStorage.getItem("user"))) {
			document.getElementById("htmlTheme").setAttribute("data-theme", JSON.parse(localStorage.getItem("theme")));
			navigate("/dashboard");
		} else {
			document.getElementById("htmlTheme").setAttribute("data-theme", "night");
		}
	}, []);
	return (
		<div>
			<Routes>
				<Route path="/" element={<Register />} />
				<Route path="onboarding" element={<Onboarding />} />
				<Route path="login" element={<Login />} />
				<Route path="dashboard" element={<Main />} />
				<Route path="interviews" element={<Main view="interviews" />} />
				<Route path="settings" element={<Main view="settings" />} />
				<Route path="applications/log" element={<Main view="logApp" />} />
				<Route path="applications/:appId" element={<Main view="viewApp" />} />
			</Routes>
		</div>
	);
}

export default App;
