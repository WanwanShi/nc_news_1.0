import { createContext, useEffect, useState } from "react";

export const DarkThemeContext = createContext();

// export const useDarkTheme = () => useContext(DarkThemeContext);

export const DarkThemeProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(false);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	return (
		<DarkThemeContext.Provider
			value={{ darkMode, setDarkMode, toggleDarkMode }}
		>
			<div className={darkMode ? "dark" : ""}>{children}</div>
		</DarkThemeContext.Provider>
	);
};
