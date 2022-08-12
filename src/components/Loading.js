import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Loading = () => {
	const { lightMode } = useContext(ThemeContext);
	return (
		<div className="loading-wrapper">
			<div
				className={`loader ${lightMode ? "loader-light" : "loader-dark"}`}
			></div>
		</div>
	);
};

export default Loading;
