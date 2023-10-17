import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import HeaderImg from "../assets/HeaderImg.jpeg";

const defaultForm = {
	FirstName: "",
	LastName: "",
	Email: "",
	Password: "",
	ConfirmPassword: ""
};

const Register = () => {
	const { dispatch } = useContext(AuthContext);
	const [form, setForm] = useState(defaultForm);
	const [errors, setErrors] = useState(null);
	const navigate = useNavigate();

	const onChangeHandler = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const addUser = await axios({
				url: "https://localhost:7261/api/users/register",
				method: "post",
				data: form,
				contentType: "application/json"
			});
			delete addUser.data.confirmPassword;
			const loggedUser = addUser.data;
			dispatch({ type: "LOGIN", payload: loggedUser });
			localStorage.setItem("user", JSON.stringify(loggedUser));
			setErrors(null);
			navigate("/onboarding");
		} catch (err) {
			console.log(err);
			setErrors(err.response.data.errors);
		}
	};

	return (
		<div className="h-screen flex justify-center items-center">
			<div className="card w-96 glass">
				<figure>
					<img src={HeaderImg} alt="JobTrack" />
				</figure>
				<div className="card-body items-center text-center">
					<h2 className="card-title">Register</h2>
					<div>
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<input
									type="text"
									name="FirstName"
									id="FirstName"
									placeholder="First Name"
									className="input input-bordered w-full max-w-xs"
									onChange={onChangeHandler}
									value={form.FirstName}
								/>
								{errors ? <span className="text-red-500">{errors.FirstName}</span> : ""}
							</div>
							<div className="mb-3">
								<input
									type="text"
									name="LastName"
									id="LastName"
									placeholder="Last Name"
									className="input input-bordered w-full max-w-xs"
									onChange={onChangeHandler}
									value={form.LastName}
								/>
								{errors ? <span className="text-red-500">{errors.LastName}</span> : ""}
							</div>
							<div className="mb-3">
								<input
									type="email"
									name="Email"
									id="Email"
									placeholder="Email"
									className="input input-bordered w-full max-w-xs"
									onChange={onChangeHandler}
									value={form.Email}
								/>
								{errors ? <span className="text-red-500">{errors.Email}</span> : ""}
							</div>
							<div className="mb-3">
								<input
									type="password"
									name="Password"
									id="Password"
									placeholder="Password"
									className="input input-bordered w-full max-w-xs"
									onChange={onChangeHandler}
									value={form.Password}
								/>
								{errors ? <span className="text-red-500">{errors.Password}</span> : ""}
							</div>
							<div className="mb-3">
								<input
									type="password"
									name="ConfirmPassword"
									id="ConfirmPassword"
									placeholder="ConfirmPassword"
									className="input input-bordered w-full max-w-xs"
									onChange={onChangeHandler}
									value={form.ConfirmPassword}
								/>
								{errors ? <span className="text-red-500">{errors.ConfirmPassword}</span> : ""}
							</div>
							<div className="card-actions justify-center">
								<button className="btn btn-primary">Register</button>
							</div>
						</form>
					</div>

					<Link to="/login">Have an account? Login here</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
