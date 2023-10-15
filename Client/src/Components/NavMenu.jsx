import { BarChart, PersonVideo, Gear } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import JTLogo from "../assets/JTLogo.svg";
import JTLogoBlack from "../assets/JTLogoBlack.svg";
import { useState } from "react";
const NavMenu = () => {
	const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")));
	const [themeType, setThemeType] = useState("");

	const selectTheme = (selectedTheme) => {
		const splitTheme = selectedTheme.split(" ");
		setTheme(splitTheme[0]);
		localStorage.setItem("theme", JSON.stringify(splitTheme[0]));
		document.getElementById("htmlTheme").setAttribute("data-theme", splitTheme[0]);

		setThemeType(splitTheme[1]);
	};

	const renderLogo = () => {
		switch (themeType) {
			case "light":
				return <img src={JTLogoBlack} alt="JTLogo" />;
			default:
				return <img src={JTLogo} alt="JTLogo" />;
		}
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
				</ul>
			</div>
			<div>
				<p className="text-xs mb-2 text-center">
					Current Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
				</p>
				<ThemeSwitcher onThemeSelect={selectTheme} />
			</div>
		</div>
	);
};

export default NavMenu;
