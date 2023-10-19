import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Clipboard } from "react-bootstrap-icons";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const defaultForm = {
	CompanyName: "",
	CompanyWebsite: "",
	PositionTitle: "",
	ApplicationWebsite: "",
	Location: "",
	Type: "Remote",
	Status: "Applied",
	ContactEmail: "",
	Notes: "",
	UserId: null
};

const LogAppForm = () => {
	const {
		state: { user }
	} = useContext(AuthContext);
	const navigate = useNavigate();
	const [form, setForm] = useState(defaultForm);
	const [userLinks, setUserLinks] = useState([]);
	const [copySuccess, setCopySuccess] = useState("");

	useEffect(() => {
		if (user) {
			setUserLinks([
				{ title: "LinkedIn", link: user.linkedIn },
				{ title: "Github", link: user.gitHub },
				{ title: "Portfolio", link: user.portfolioWebsite },
				{ title: "Personal", link: user.personalWebsite },
				{ title: "Other", link: user.otherWebsite }
			]);
			setForm({ ...form, UserId: user.userId });
		}
	}, []);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const copyToClipboard = async (text, link) => {
		try {
			await navigator.clipboard.writeText(link);
			setCopySuccess(`Copied ${text} Link!`);
			setTimeout(() => {
				setCopySuccess("");
			}, 2000);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const logApp = await axios({
				url: "https://localhost:7261/api/applications",
				method: "post",
				data: form,
				contentType: "application/json"
			});
			console.log(logApp);
			navigate("/dashboard");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="w-3/4 mx-auto">
			<h3 className="text-center text-2xl  font-bold mb-4">Log a new Application</h3>
			<p className=" text-center text-xs mb-2">Copy your social links for your applications</p>
			<div className="flex gap-4 justify-center  mb-2">
				{userLinks &&
					userLinks.map((link, idx) => {
						if (link.link != "") {
							return (
								<button
									key={idx}
									className="flex items-center gap-2"
									onClick={() => copyToClipboard(link.title, link.link)}>
									{link.title} <Clipboard />
								</button>
							);
						}
					})}
			</div>

			<div className="text-center  h-4 align-middle mb-4">
				{copySuccess && <span className="text-center text-primary">{copySuccess}</span>}
			</div>

			<form onSubmit={handleSubmit} className=" flex flex-col items-center">
				<div className="flex gap-5">
					<div className="space-y-4 w-1/2">
						<input
							type="text"
							name="CompanyName"
							value={form.CompanyName}
							className="input input-bordered w-full"
							placeholder="Company Name"
							onChange={handleChange}
						/>
						<input
							type="text"
							name="CompanyWebsite"
							value={form.CompanyWebsite}
							className="input input-bordered w-full"
							placeholder="Company Website"
							onChange={handleChange}
						/>
						<input
							type="text"
							name="PositionTitle"
							value={form.PositionTitle}
							className="input input-bordered w-full"
							placeholder="Position Title"
							onChange={handleChange}
						/>
						<input
							type="text"
							name="ApplicationWebsite"
							value={form.ApplicationWebsite}
							className="input input-bordered w-full"
							placeholder="Application Website"
							onChange={handleChange}
						/>
						<input
							type="text"
							name="Location"
							value={form.Location}
							className="input input-bordered w-full"
							placeholder="Location (City, State)"
							onChange={handleChange}
						/>
						<select name="Type" className="select select-bordered w-full" onChange={handleChange}>
							<option disabled>--Select Type of Position--</option>
							<option value="Remote">Remote</option>
							<option value="On-Site">On-Site</option>
							<option value="Hybrid">Hybrid</option>
						</select>
					</div>
					<div className="w-1/2 space-y-4">
						<select name="Status" className="select select-bordered w-full" onChange={handleChange}>
							<option disabled>--Select Status--</option>
							<option value="Applied">Applied</option>
							<option value="Contacted">Contacted</option>
							<option value="Rejected">Rejected</option>
							<option value="Interview">Interview</option>
							<option value="Post-Interview">Post-Interview</option>
							<option value="Negotiation">Negotiation</option>
							<option value="Declined">Declined</option>
							<option value="Accepted">Accepted</option>
						</select>
						<textarea
							name="Notes"
							cols="30"
							rows="10"
							className="textarea textarea-bordered w-full"
							placeholder="Notes"
							onChange={handleChange}></textarea>
					</div>
				</div>

				<button className="mt-5 btn btn-primary w-1/4">Log Application</button>
			</form>
		</div>
	);
};

export default LogAppForm;
