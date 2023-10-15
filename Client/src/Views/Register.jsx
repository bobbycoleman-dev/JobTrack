import HeaderImg from "../assets/HeaderImg.jpeg";
import { Link } from "react-router-dom";

const Register = () => {
	return (
		<div className="h-screen flex justify-center items-center">
			<div className="card w-96 glass">
				<figure>
					<img src={HeaderImg} alt="JobTrack" />
				</figure>
				<div className="card-body items-center text-center">
					<h2 className="card-title">Register</h2>
					<div>
						<form>
							<div className="mb-3">
								<input
									type="text"
									name="FirstName"
									id="FirstName"
									placeholder="First Name"
									className="input input-bordered w-full max-w-xs"
								/>
							</div>
							<div className="mb-3">
								<input
									type="text"
									name="LastName"
									id="LastName"
									placeholder="Last Name"
									className="input input-bordered w-full max-w-xs"
								/>
							</div>
							<div className="mb-3">
								<input
									type="email"
									name="Email"
									id="Email"
									placeholder="Email"
									className="input input-bordered w-full max-w-xs"
								/>
							</div>
							<div className="mb-3">
								<input
									type="password"
									name="Password"
									id="Password"
									placeholder="Password"
									className="input input-bordered w-full max-w-xs"
								/>
							</div>
							<div className="mb-3">
								<input
									type="password"
									name="ConfirmPassword"
									id="ConfirmPassword"
									placeholder="ConfirmPassword"
									className="input input-bordered w-full max-w-xs"
								/>
							</div>
						</form>
					</div>
					<div className="card-actions justify-end">
						<button className="btn btn-primary">Register</button>
					</div>
					<Link to="/login">Have an account? Login here</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
