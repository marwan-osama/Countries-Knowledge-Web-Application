import IconButton from "./IconButton";
import { faMoon as solidMoon } from "@fortawesome/free-solid-svg-icons";
import { faMoon as thinMoon } from "@fortawesome/free-regular-svg-icons";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
	const { lightMode, toggleLightMode } = useContext(ThemeContext);

	return (
		<nav className={`${lightMode ? "bg-white" : "bg-blue"}`}>
			<div className="nav-inner-wrapper">
				<h1 className={`fs-res-l ${lightMode ? "clr-vd-blue" : "clr-white"}`}>
					<Link to="/" className="reset-anchor">
						Where in the world?
					</Link>
				</h1>
				<IconButton
					text={lightMode ? "Dark Mode" : "Light Mode"}
					icon={lightMode ? thinMoon : solidMoon}
					onClick={toggleLightMode}
					className={`bg-transparent hvr-scale-up ${
						lightMode ? "clr-vd-blue" : "clr-white"
					}`}
				/>
			</div>
		</nav>
	);
};

export default NavBar;
