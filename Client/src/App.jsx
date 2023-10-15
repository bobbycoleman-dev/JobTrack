import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./Views/Main";
import Register from "./Views/Register";
import Login from "./Views/Login";

function App() {
	const navigate = useNavigate();

	useEffect(() => {
		document.getElementById("htmlTheme").setAttribute("data-theme", JSON.parse(localStorage.getItem("theme")));
	}, []);

	return (
		<div>
			<Routes>
				<Route path="/" element={<Register />} />
				<Route path="login" element={<Login />} />
				<Route path="dashboard" element={<Main />} />
				<Route path="interviews" element={<Main view="interviews" />} />
				<Route path="settings" element={<Main view="settings" />} />
			</Routes>
		</div>
	);
}

export default App;
