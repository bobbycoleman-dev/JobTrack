import { useState } from "react";
import { themes } from "../Constants/themes";

const ThemeSwitcher = (props) => {
	return (
		<div>
			<select
				className="select select-bordered p-0 pl-2 text-xs w-full"
				onChange={(e) => props.onThemeSelect(e.target.value)}
				defaultValue="--Select Theme--">
				<option disabled>--Select Theme--</option>
				{themes.map((theme, idx) => {
					return (
						<option key={idx} value={`${theme.theme} ${theme.type}`}>
							{theme.title}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default ThemeSwitcher;
