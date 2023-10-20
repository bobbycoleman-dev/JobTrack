import { useState } from "react";
import { BarChart, FileEarmarkPlus, Gear, PersonVideo, Power } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import JTLogo from "../assets/JTLogo.svg";
import JTLogoBlack from "../assets/JTLogoBlack.svg";
import ThemeSwitcher from "./ThemeSwitcher";

const NavMenu = () => {
	const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")).theme);
	const [themeType, setThemeType] = useState(JSON.parse(localStorage.getItem("themeType")));
	const navigate = useNavigate();

	const selectTheme = (selectedTheme) => {
		const theme = JSON.parse(selectedTheme);
		setTheme(theme.theme);
		localStorage.setItem("theme", selectedTheme);
		document.getElementById("htmlTheme").setAttribute("data-theme", theme.theme);

		setThemeType(theme.type);
	};

	const renderLogo = () => {
		switch (themeType) {
			case "light":
				return <img src={JTLogoBlack} alt="JTLogo" />;
			default:
				return <img src={JTLogo} alt="JTLogo" />;
		}
	};

	const logoutUser = () => {
		localStorage.removeItem("user");
		document.getElementById("htmlTheme").setAttribute("data-theme", "night");
		navigate("/login");
	};

	return (
		<div className="w-48 h-full fixed top-0 left-0 p-2 shadow-xl shadow-slate-400/50 flex flex-col justify-between">
			<div className="space-y-5">
				{renderLogo()}

				<ul className="space-y-5 text-2xl">
					<li>
						<Link to="/dashboard" className="flex items-center gap-2 cursor-pointer hover:text-info">
							<BarChart /> Dashboard
						</Link>
					</li>
					<li>
						<Link to="/interviews" className="flex items-center gap-2 cursor-pointer hover:text-info">
							<PersonVideo /> Interviews
						</Link>
					</li>
					<li>
						<Link to="/settings" className="flex items-center gap-2 cursor-pointer hover:text-info">
							<Gear /> Settings
						</Link>
					</li>
					<li>
						<Link to="/applications/log" className="btn btn-primary w-full mb-4 text-lg">
							<FileEarmarkPlus /> Log App
						</Link>
					</li>
				</ul>
			</div>
			<div>
				<button className="btn btn-primary w-full mb-4 text-lg" onClick={logoutUser}>
					<Power /> Logout
				</button>
				{theme && (
					<p className="text-xs mb-2 text-center">
						Current Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
					</p>
				)}

				<ThemeSwitcher onThemeSelect={selectTheme} />
			</div>
		</div>
	);
};

export default NavMenu;
