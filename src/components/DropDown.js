import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import { FilterContext } from "../context/FilterContext";
const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const DropDown = ({ handleSearchByRegion }) => {
	const [showDropDown, setShowDropDown] = useState(false);
	const { filter } = useContext(FilterContext);
	const [selected, setSelected] = useState(filter.region);
	const { lightMode } = useContext(ThemeContext);

	const toggleShowDropDown = () => {
		setShowDropDown(!showDropDown);
	};

	const handleClick = (e) => {
		if (e.target.innerText === selected) {
			setSelected(null);
		} else {
			setSelected(e.target.innerText);
		}
	};

	useEffect(() => {
		handleSearchByRegion(selected);
	}, [selected]);

	return (
		<div className="drop-down">
			<button
				onClick={toggleShowDropDown}
				className={`btn ${
					lightMode ? "bg-white clr-vd-blue" : "bg-blue clr-white"
				}`}
			>
				<span>{selected ? selected : "Filter by Region"}</span>

				<CSSTransition in={showDropDown} timeout={250} classNames="flip">
					<FontAwesomeIcon icon={faAngleDown} />
				</CSSTransition>
			</button>
			<CSSTransition in={showDropDown} timeout={250} classNames="slide">
				<ul
					className={`scaleY-0 ${
						lightMode ? "bg-white clr-vd-blue" : "bg-blue clr-white"
					}`}
				>
					{regions.map((region) => {
						if (region === selected) {
							return (
								<li
									key={region}
									className={`selected fs-s ${
										lightMode ? "bg-blue clr-white" : "bg-white clr-vd-blue"
									}`}
									onClick={handleClick}
								>
									<span>{region}</span>
									<FontAwesomeIcon icon={faCheck} />
								</li>
							);
						}
						return (
							<li
								key={region}
								className={`fs-s ${
									lightMode
										? "hvr-bg-d-blue hvr-clr-white"
										: "hvr-bg-white hvr-clr-vd-blue"
								}`}
								onClick={handleClick}
							>
								{region}
							</li>
						);
					})}
				</ul>
			</CSSTransition>
		</div>
	);
};

export default DropDown;
