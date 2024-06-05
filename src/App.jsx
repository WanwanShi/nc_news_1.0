import "./App.css";
import Body from "./Components/Body";
import Header from "./Components/Header";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Welcome from "./Components/Welcome";
import SingleArticle from "./Components/Article/SingleArticle";
import Login from "./Components/User/Login";
import ErrorPage from "./Components/ErrorPage";
import Profile from "./Components/User/Profile";

function App() {
	const [currentSearch, setCurrentSearch] = useState("");
	const [searchParams, setSearchParams] = useSearchParams("");

	return (
		<div className="bg-mainBg text-mainText">
			<div>
				<header>
					<div className="header-container grid sticky mx-3">
						<Header
							setCurrentSearch={setCurrentSearch}
							setSearchParams={setSearchParams}
							searchParams={searchParams}
						/>
					</div>
				</header>
				<main>
					<div className="body-container  bg-mainBg color-text">
						<Routes>
							<Route path="/" element={<Welcome />} />
							<Route
								path="/news"
								element={
									<Body
										currentSearch={currentSearch}
										searchParams={searchParams}
									/>
								}
							/>
							<Route path="/news/:article_id" element={<SingleArticle />} />
							<Route path="/news/users/login" element={<Login />} />
							<Route path="/news/users/profile/" element={<Profile />} />
							<Route path="*" element={<ErrorPage />} />
						</Routes>
					</div>
				</main>
			</div>
		</div>
	);
}

export default App;
