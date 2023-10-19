import { useEffect, useState } from "react";
import axios from "axios";

const EditUserForm = ({ user, updateUser }) => {
	const [form, setForm] = useState({
		UpdateUserId: user.userId,
		UpdateFirstName: user.firstName,
		UpdateLastName: user.lastName,
		UpdateEmail: user.email,
		UpdateLinkedIn: user.linkedIn,
		UpdateGitHub: user.gitHub,
		UpdatePortfolioWebsite: user.portfolioWebsite,
		UpdatePersonalWebsite: user.personalWebsite,
		UpdateOtherWebsite: user.otherWebsite,
		UpdateDailySubmitGoal: user.dailySubmitGoal
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const updatedUser = await axios({
				url: `https://localhost:7261/api/users/${user.userId}/update`,
				method: "post",
				data: form,
				ContentType: "application/json"
			});
			updateUser(updatedUser.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-3/4 mx-auto">
			<div className="mx-auto">
				<button className="btn btn-primary">Save Changes</button>
			</div>
			<div className="flex items-center justify-center w-full gap-4">
				<div className="flex flex-col items-center gap-3 w-full">
					<input
						type="text"
						name="UpdateFirstName"
						className="input input-bordered w-full"
						placeholder="First Name"
						value={form.UpdateFirstName}
						onChange={handleChange}
					/>
					<input
						type="text"
						name="UpdateLastName"
						className="input input-bordered w-full"
						placeholder="Last Name"
						value={form.UpdateLastName}
						onChange={handleChange}
					/>
					<input
						type="text"
						name="UpdateEmail"
						className="input input-bordered w-full"
						placeholder="Email"
						value={form.UpdateEmail}
						onChange={handleChange}
					/>
					<input
						type="text"
						name="UpdateLinkedIn"
						className="input input-bordered w-full"
						placeholder="LinkedIn"
						value={form.UpdateLinkedIn}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col items-center gap-3 w-full">
					<input
						type="text"
						name="UpdateGitHub"
						className="input input-bordered w-full"
						placeholder="GitHub"
						value={form.UpdateGitHub}
						onChange={handleChange}
					/>
					<input
						type="text"
						name="UpdatePortfolioWebsite"
						className="input input-bordered w-full"
						placeholder="Portfolio Website"
						value={form.UpdatePortfolioWebsite}
						onChange={handleChange}
					/>
					<input
						type="text"
						name="UpdatePersonalWebsite"
						className="input input-bordered w-full"
						placeholder="Personal Website"
						value={form.UpdatePersonalWebsite}
						onChange={handleChange}
					/>
					<input
						type="text"
						name="UpdateOtherWebsite"
						className="input input-bordered w-full"
						placeholder="Other Website"
						value={form.UpdateOtherWebsite}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="w-1/2 flex flex-col items-center justify-center mx-auto gap-3">
				<label htmlFor="UpdateDailySubmitGoal" className="text-center">
					Daily Submit Goal: {form.UpdateDailySubmitGoal}
				</label>
				<input
					type="range"
					name="UpdateDailySubmitGoal"
					min="0"
					max="25"
					value={form.UpdateDailySubmitGoal}
					className="range"
					onChange={handleChange}
				/>
			</div>
		</form>
	);
};

export default EditUserForm;
