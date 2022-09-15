import CountryCard from "./CountryCard";
import { ThemeContext } from "../context/ThemeContext";
import { FilterContext } from "../context/FilterContext";
import { useContext } from "react";

const CountryDetail = () => {
	const { countries } = useContext(FilterContext);
	const { lightMode } = useContext(ThemeContext);

	return countries.length ? (
		<div className="countries-list">
			{countries.map((country) => {
				return <CountryCard country={country} key={country.name?.official} />;
			})}
		</div>
	) : (
		<p
			className={`non-matching-text center-text ${
				lightMode ? "clr-vd-blue" : "clr-white"
			}`}
		>
			There is no Countries matches that Search.
		</p>
	);
};

export default CountryDetail;
