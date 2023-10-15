import HeaderImg from "../assets/HeaderImg.jpeg";
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div className="h-screen flex justify-center items-center">
			<div className="card w-96 glass">
				<figure>
					<img src={HeaderImg} alt="JobTrack" />
				</figure>
				<div className="card-body items-center text-center">
					<h2 className="card-title">Login</h2>
					<div>
						<form>
							<div className="mb-3">
								{/* <label htmlFor="Email">Email</label> */}
								<input
									type="email"
									name="Email"
									id="Email"
									placeholder="Email"
									className="input input-bordered w-full max-w-xs"
								/>
							</div>
							<div className="mb-3">
								{/* <label htmlFor="Password">Password</label> */}
								<input
									type="password"
									name="Password"
									id="Password"
									placeholder="Password"
									className="input input-bordered w-full max-w-xs"
								/>
							</div>
						</form>
					</div>
					<div className="card-actions justify-end">
						<button className="btn btn-primary">Sign In</button>
					</div>
					<Link to="/">Need an account? Register here</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
