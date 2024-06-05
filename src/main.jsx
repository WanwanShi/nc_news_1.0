import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/User.jsx";
import { DarkThemeProvider } from "./contexts/DarkTheme.jsx";
window.React = React;

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<UserProvider>
			<DarkThemeProvider>
				<App />
			</DarkThemeProvider>
		</UserProvider>
	</BrowserRouter>
);
