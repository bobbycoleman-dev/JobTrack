import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import SettingsInfo from "../Components/SettingsInfo";
import EditUserForm from "../Components/EditUserForm";

const Settings = () => {
	const {
		state: { user },
		dispatch
	} = useContext(AuthContext);
	const [isEditing, setIsEditing] = useState(false);

	const handleUpdate = (updatedUser) => {
		dispatch({ type: "LOGIN", payload: updatedUser });
		localStorage.setItem("user", JSON.stringify(updatedUser));
		setIsEditing(false);
	};

	return (
		<>
			{user ? (
				<div className="h-full flex flex-col justify-between">
					<section className="space-y-4">
						<p className="text-3xl ml-12 text-primary font-bold underline">User Information:</p>
						<div className="text-xl space-y-2">
							<SettingsInfo title={"First Name"} info={user.firstName} />
							<SettingsInfo title={"Last Name"} info={user.lastName} />
							<SettingsInfo title={"Email"} info={user.email} />
						</div>
						<p className="text-3xl ml-12 text-primary font-bold underline">JabTrack Information:</p>
						<div className="text-xl space-y-2">
							<SettingsInfo title={"LinkedIn"} info={user.linkedIn} />
							<SettingsInfo title={"GitHub"} info={user.gitHub} />
							<SettingsInfo title={"Portfolio Website"} info={user.portfolioWebsite} />
							<SettingsInfo title={"Personal Website"} info={user.personalWebsite} />
							<SettingsInfo title={"Other Website"} info={user.otherWebsite} />
							<SettingsInfo title={"Daily Submit Goal"} info={user.dailySubmitGoal} />
						</div>
						<div className="pt-12">
							{isEditing ? (
								<EditUserForm user={user} updateUser={handleUpdate} />
							) : (
								<div className="flex flex-col items-center" onClick={() => setIsEditing(!isEditing)}>
									<button className="btn btn-primary">Edit Account Info</button>
								</div>
							)}
						</div>
					</section>
					<div className="border-2 rounded border-red-500 w-1/3 mx-auto p-3 flex flex-col items-center gap-4 shadow-xl">
						<p className="text-warning">Danger Zone</p>
						<form>
							<button className="btn btn-error">Delete All Applications</button>
						</form>
						<form>
							<button className="btn btn-error">Delete Account</button>
						</form>
					</div>
				</div>
			) : (
				<span className="loading loading-spinner loading-lg"></span>
			)}
		</>
	);
};

export default Settings;
