import { useState, useContext } from "react";
import { getUserByUsername } from "./api";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [usernameInput, setUsernameInput] = useState("");
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();
	const handleLogin = (e) => {
		e.preventDefault();
		getUserByUsername(usernameInput)
			.then(({ data }) => {
				setUser(data.user);
				navigate(-1);
			})
			.catch(() => {
				alert("Sorry, your username is wrong");
			});
	};
	return (
		<div className="size-80 mx-20 my-20 ">
			<form onSubmit={handleLogin} className="h-80">
				<div className="inline my-20">
					<label htmlFor="username" className="text-lg mx-3">
						Your username:
					</label>
					<input
						type="text"
						id="username"
						value={usernameInput}
						className="bg-orange-100 rounded-lg "
						onChange={(e) => setUsernameInput(e.target.value)}
					/>
				</div>
				<div className="p-20">
					<button className="rounded-lg text-lg p-1 btn-hl mx-20 my-30">
						Login
					</button>
				</div>
			</form>
		</div>
	);
}