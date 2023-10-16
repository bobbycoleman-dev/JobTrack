import { useState } from "react";
import HeaderImg from "../assets/HeaderImg.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const defaultForm = {
	LogEmail: "",
	LogPassword: ""
};

const Login = () => {
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
				url: "https://localhost:7261/api/users/login",
				method: "post",
				data: form,
				contentType: "application/json"
			});
			const loggedUser = {
				UserId: addUser.data.userId,
				FirstName: addUser.data.firstName,
				LastName: addUser.data.lastName,
				Email: addUser.data.email
			};
			localStorage.setItem("user", JSON.stringify(loggedUser));
			document.getElementById("htmlTheme").setAttribute("data-theme", JSON.parse(localStorage.getItem("theme")));
			setErrors(null);
			navigate("/dashboard");
		} catch (err) {
			console.log(err);
			if (err.response.data.errors) {
				setErrors(err.response.data.errors);
			} else {
				setErrors(err.response.data);
			}
		}
	};

	return (
		<div className="h-screen flex justify-center items-center">
			<div className="card w-96 glass">
				<figure>
					<img src={HeaderImg} alt="JobTrack" />
				</figure>
				<div className="card-body items-center text-center">
					<h2 className="card-title">Login</h2>

					<div>
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								{/* <label htmlFor="Email">Email</label> */}
								<input
									type="email"
									name="LogEmail"
									id="LogEmail"
									placeholder="Email"
									className="input input-bordered w-full"
									onChange={onChangeHandler}
									value={form.Email}
								/>
								{errors ? <span className="text-red-500">{errors.LogEmail}</span> : ""}
							</div>
							<div className="mb-3">
								{/* <label htmlFor="Password">Password</label> */}
								<input
									type="password"
									name="LogPassword"
									id="LogPassword"
									placeholder="Password"
									className="input input-bordered w-full"
									onChange={onChangeHandler}
									value={form.Password}
								/>
								{errors ? <span className="text-red-500">{errors.LogPassword}</span> : ""}
							</div>
							<div className="card-actions justify-center">
								<button className="btn btn-primary">Sign In</button>
							</div>
						</form>
					</div>

					<Link to="/">Need an account? Register here</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
