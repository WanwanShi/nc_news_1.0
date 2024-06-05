import { useContext } from "react";
import { DarkThemeContext } from "../contexts/DarkTheme";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
function ToggleMode() {
	const { darkMode, toggleDarkMode } = useContext(DarkThemeContext);

	return (
		<button onClick={toggleDarkMode}>
			{darkMode ? <MdDarkMode size={32} /> : <MdOutlineLightMode size={32} />}
		</button>
	);
}

export default ToggleMode;
