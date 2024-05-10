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
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
	const [currentSearch, setCurrentSearch] = useState("");
	const [searchParams, setSearchParams] = useSearchParams("");

	const theme = createTheme({
		palette: {
			primary: {
				main: "#eddec7",
				light: "#ab8a5b",
				dark: "#deb781",
			},
		},
	});

	return (
		<>
			<ThemeProvider theme={theme}>
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
					<div className="body-container mx-3">
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
							<Route path="*" element={<ErrorPage />} />
							{/*<Route
						path="/news/users/:username/post_article"
						element={<NewArticleAdder />}
					/>
					<Route path="/news/users/:username/comments" element={<MePage />} />
					<Route path="/news/users/:username/articles" element={<MePage />} /> */}
						</Routes>
					</div>
				</main>
				<footer>
					<div className="footer-container mx-3">
						<Footer />
					</div>
				</footer>
			</ThemeProvider>
		</>
	);
}

export default App;
