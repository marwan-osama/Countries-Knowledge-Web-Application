import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
	const { lightMode } = useContext(ThemeContext);

	return (
		<div
			className={`country-card ${
				lightMode ? "clr-vd-blue bg-white" : "clr-vl-gray bg-blue"
			}`}
		>
			<Link
				to={`/details/${country.name.official}`}
				aria-label={`More details about ${country.name.common}`}
			>
				<div
					className="flag-img"
					style={{ backgroundImage: `url(${country.flags.svg})` }}
				></div>
			</Link>
			<div className="country-info">
				<div className="country-name fs-m fw-l">
					<Link
						to={`/details/${country.name.official}`}
						className="reset-anchor"
					>
						{country.name.common}
					</Link>
				</div>
				<div className="country-more-info">
					<p className="fs-xs fw-s">
						<span className="fs-xs fw-m">Population: </span>
						{country.population
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
					</p>
					<p className="fs-xs fw-s">
						<span className="fs-xs fw-m">Region: </span>
						{country.region}
					</p>
					<p className="fs-xs fw-s">
						<span className="fs-xs fw-m">Capital: </span>
						{country.capital}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CountryCard;
