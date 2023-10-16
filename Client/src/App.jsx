import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Views/Main";
import Register from "./Views/Register";
import Login from "./Views/Login";
import Onboarding from "./Views/Onboarding";

function App() {
	useEffect(() => {
		if (JSON.parse(localStorage.getItem("user"))) {
			document.getElementById("htmlTheme").setAttribute("data-theme", JSON.parse(localStorage.getItem("theme")));
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
			</Routes>
		</div>
	);
}

export default App;
