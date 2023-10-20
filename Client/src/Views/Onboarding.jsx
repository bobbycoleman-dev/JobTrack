import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "../Components/ThemeSwitcher";
import { AuthContext } from "../Context/AuthContext";

const onboardForm = {
	OnboardLinkedIn: "",
	OnboardGitHub: "",
	OnboardPortfolioWebsite: "",
	OnboardPersonalWebsite: "",
	OnboardOtherWebsite: "",
	OnboardDailySubmitGoal: 5,
	OnboardUserId: null
};

const Onboarding = () => {
	const {
		state: { user }
	} = useContext(AuthContext);
	const [form, setForm] = useState(onboardForm);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const selectTheme = (selectedTheme) => {
		const theme = JSON.parse(selectedTheme);
		setTheme(theme.theme);
		localStorage.setItem("theme", selectedTheme);
		document.getElementById("htmlTheme").setAttribute("data-theme", theme.theme);

		setThemeType(theme.type);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(user);
		const updatedForm = { ...form, OnboardUserId: user.userId };
		console.log(form);
		try {
			const updatedUser = await axios({
				url: `https://localhost:7261/api/users/${user.userId}/onboard`,
				method: "post",
				data: updatedForm,
				ContentType: "application/json"
			});
			localStorage.setItem("user", JSON.stringify(updatedUser.data));
			navigate("/dashboard");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="p-12">
			<form onSubmit={handleSubmit}>
				<h2 className="text-center text-5xl mb-8">Thanks for signing up for JobTrack!</h2>
				<p className="text-center text-xl w-1/2 mx-auto">
					You are on the first steps of landing your next big job, so let's start by getting a little bit more
					information to aid you in your journey
				</p>
				<div className="mt-8 flex justify-between mx-auto">
					<div className="px-12 space-y-3">
						<h3 className="text-xl font-bold underline">Social Links</h3>
						<p className="w-3/4">
							Many applications require you to provide links to your social websites, so by adding them
							here, you can have quick and easy access to them to copy and paste
						</p>

						<input
							type="text"
							name="OnboardLinkedIn"
							className="input input-bordered w-3/4"
							placeholder="LinkedIn"
							value={form.LinkedIn}
							onChange={handleChange}
						/>
						<input
							type="text"
							name="OnboardGitHub"
							className="input input-bordered w-3/4"
							placeholder="GitHub"
							value={form.GitHub}
							onChange={handleChange}
						/>
						<input
							type="text"
							name="OnboardPortfolioWebsite"
							className="input input-bordered w-3/4"
							placeholder="Portfolio Website"
							value={form.PortfolioWebsite}
							onChange={handleChange}
						/>
						<input
							type="text"
							name="OnboardPersonalWebsite"
							className="input input-bordered w-3/4"
							placeholder="Personal Website"
							value={form.PersonalWebsite}
							onChange={handleChange}
						/>
						<input
							type="text"
							name="OnboardOtherWebsite"
							className="input input-bordered w-3/4"
							placeholder="Other Website"
							value={form.OtherWebsite}
							onChange={handleChange}
						/>
					</div>
					<div className="space-y-4">
						<h3 className="text-xl font-bold underline">Daily Goal</h3>
						<p className="w-3/4">
							Your daily goal is how many applications you plan to submit each day. We started you out at
							5, but you are encouraged to increase this number two or even three times!
						</p>
						<p className="text-3xl w-3/4 text-center">Goal: {form.OnboardDailySubmitGoal}</p>
						<input
							type="range"
							name="OnboardDailySubmitGoal"
							min="0"
							max="25"
							value={form.OnboardDailySubmitGoal}
							className="range w-3/4"
							onChange={handleChange}
						/>
						<h3 className="text-xl font-bold underline pt-3">Select your Theme</h3>
						<p className="w-3/4">
							JobTrack has a bunch of light and dark themes that you can change at any time
						</p>
						<div className="w-3/4">
							<ThemeSwitcher onThemeSelect={selectTheme} />
						</div>
					</div>
				</div>
				<div className="mt-12 flex justify-center w-full">
					<button className="btn btn-primary w-1/4">Complete Onboarding</button>
				</div>
			</form>
			<div className="mt-5 flex justify-center w-full">
				<Link to="/dashboard" className="btn btn-secondary w-1/4">
					Skip This Step
				</Link>
			</div>
		</div>
	);
};

export default Onboarding;
