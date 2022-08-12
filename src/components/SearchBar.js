import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

const SearchBar = ({ handleSearchByName }) => {
	const [query, setQuery] = useState("");
	const { lightMode } = useContext(ThemeContext);
	const inputDebouncer = useRef(null);

	const handleChange = (e) => {
		setQuery(e.target.value.trimStart());
	};

	useEffect(() => {
		clearTimeout(inputDebouncer.current);
		inputDebouncer.current = setTimeout(() => {
			handleSearchByName(query);
		}, 300);
	}, [query]);

	return (
		<div
			className={`search-bar ${
				lightMode ? "bg-white clr-vd-blue" : "bg-blue clr-white"
			}`}
		>
			<FontAwesomeIcon icon={faMagnifyingGlass} fontSize={15} />
			<input
				placeholder="Search for a country..."
				className={`fs-s fw-s ${
					lightMode ? "clr-vd-blue ph-d-gray" : "clr-white ph-vl-gray"
				}`}
				onChange={handleChange}
				value={query}
			/>
		</div>
	);
};

export default SearchBar;
