import Filter from "./Filter";
import CountriesList from "./CountriesList";
import { useContext } from "react";
import { FilterContext } from "../context/FilterContext";
import Loading from "./Loading";

const Countries = () => {
	const { loading } = useContext(FilterContext);

	return (
		<main>
			<Filter />
			{loading ? <Loading /> : <CountriesList />}
		</main>
	);
};

export default Countries;
