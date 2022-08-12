import SearchBar from "./SearchBar";
import DropDown from "./DropDown";
import { FilterContext } from "../context/FilterContext";
import { useContext } from "react";

const Filter = () => {
	const { filter, changeFilter } = useContext(FilterContext);

	const searchByName = (query) => {
		const cleanQuery = query.trimStart();
		const copyFilter = { ...filter };
		copyFilter.query = cleanQuery;
		changeFilter(copyFilter);
	};
	const searchByRegion = (region) => {
		const copyFilter = { ...filter };
		copyFilter.region = region;
		changeFilter(copyFilter);
	};

	return (
		<div className="filter">
			<SearchBar handleSearchByName={searchByName} />
			<DropDown handleSearchByRegion={searchByRegion} />
		</div>
	);
};

export default Filter;
