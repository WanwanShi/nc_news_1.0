import { useContext, useState } from "react";
import { UserContext } from "../../contexts/User";
import { useNavigate } from "react-router-dom";

export default function Profile() {
	const { user, setUser } = useContext(UserContext);
	const [login] = useState(user.username !== undefined);

	const navigate = useNavigate();
	const handleLogin = () => {
		navigate("/news/users/login");
	};
	return (
		<>
			{!login && <button onClick={handleLogin}>Login</button>}
			{login && (
				<>
					<button onClick={() => setUser({})}>Logout</button>
					<h1> This is my page</h1>
				</>
			)}
		</>
	);
}
