import { createContext, useEffect, useState } from "react";
import {
	fetchAllCounties,
	searchCountriesByName,
	searchCountriesByRegion,
} from "../utils/apiUtils";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
	const [countries, setCountries] = useState([]);
	const [filter, setFilter] = useState({ query: "", region: "" });
	const [loading, setLoading] = useState(false);

	const changeFilter = (newFilter) => {
		setFilter(newFilter);
		setLoading(true);
	};

	useEffect(() => {
		const applyFilter = async () => {
			let data;
			if (filter.query && filter.region) {
				const data1 = await searchCountriesByName(filter.query);

				data = data1.filter((country) => country.region === filter.region);
			} else if (filter.query) {
				data = await searchCountriesByName(filter.query);
			} else if (filter.region) {
				data = await searchCountriesByRegion(filter.region);
			} else {
				data = await fetchAllCounties();
			}
			setLoading(false);
			setCountries(data);
		};
		applyFilter();
	}, [filter]);

	return (
		<FilterContext.Provider
			value={{ countries, filter, changeFilter, loading }}
		>
			{children}
		</FilterContext.Provider>
	);
};

export { FilterContext, FilterProvider };
