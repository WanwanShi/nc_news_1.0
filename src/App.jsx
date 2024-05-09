import "./App.css";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Welcome from "./Components/Welcome";
import SingleArticle from "./Components/SingleArticle";
import Login from "./Components/Login";
import ErrorPage from "./Components/ErrorPage";

function App() {
	const [currentSearch, setCurrentSearch] = useState("");
	const [searchParams, setSearchParams] = useSearchParams("");
	return (
		<>
			<div className="header-container grid sticky">
				<Header
					setCurrentSearch={setCurrentSearch}
					setSearchParams={setSearchParams}
				/>
			</div>
			<div className="body-container">
				<Routes>
					<Route path="/" element={<Welcome />} />
					<Route
						path="/news"
						element={
							<Body currentSearch={currentSearch} searchParams={searchParams} />
						}
					/>
					<Route path="/news/:article_id" element={<SingleArticle />} />
					<Route path="/news/users/login" element={<Login />} />
					<Route path="*" element={<ErrorPage />} />
					{/*<Route
						path="/news/users/:username/post_article"
						element={<NewArticleAdder />}
					/>
					<Route path="/news/users/:username/comments" element={<MePage />} />
					<Route path="/news/users/:username/articles" element={<MePage />} /> */}
				</Routes>
			</div>
			<div className="footer-container ">
				<Footer />
			</div>
		</>
	);
}

export default App;
