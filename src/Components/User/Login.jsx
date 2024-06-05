import { useState, useContext } from "react";
import { getUserByUsername } from "../../utils/api";
import { UserContext } from "../../contexts/User";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";

export default function Login() {
	const [usernameInput, setUsernameInput] = useState("");
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();
	const [isError, setIsError] = useState(false);

	const handleLogin = (e) => {
		e.preventDefault();
		if (usernameInput.length === 0) {
			alert("username can not be empty");
		} else {
			setIsError(false);
			getUserByUsername(usernameInput)
				.then(({ data }) => {
					setUser(data.user);
					navigate(-1);
				})
				.catch(() => {
					setIsError(true);
				});
		}
	};
	return (
		<>
			{isError ? <ErrorPage /> : null}
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
							placeholder="grumpy19"
						/>
						<p className="mx-3 text-sm text-gray-500">
							You can try to login with "grumpy19" as username
						</p>
					</div>
					<div className="p-20">
						<button className="rounded-lg text-lg p-1 btn-hl mx-20 my-30">
							Login
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
