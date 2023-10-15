import Login from "./Login";
import Register from "./Register";

const LoginRegistration = () => {
	return (
		<div className="h-screen p-12">
			<div className="h-full flex justify-center items-center">
				<Login />
				<Register />
			</div>
		</div>
	);
};

export default LoginRegistration;
