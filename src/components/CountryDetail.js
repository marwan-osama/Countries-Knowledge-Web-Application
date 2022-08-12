import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
	searchCountriesByCodes,
	searchCountriesByExactName,
} from "../utils/apiUtils";
import { ThemeContext } from "../context/ThemeContext";
import IconButton from "./IconButton";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";

const parseCountryData = (country, borderCountries) => {
	const parsedCountry = {};
	parsedCountry.name = country.name.common;
	parsedCountry.flag = country.flags.svg;
	parsedCountry.nativeName = country.name.nativeName
		? country.name.nativeName[
				Object.keys(country.name.nativeName)[
					Object.keys(country.name.nativeName).length - 1
				]
		  ].common
		: country.name.common;
	parsedCountry.population = country.population
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	parsedCountry.region = country.region;
	parsedCountry.subregion = country.subregion || "NA";
	parsedCountry.capital = country.capital || "NA";
	parsedCountry.tld = country.tld;
	parsedCountry.currencies = country.currencies
		? Object.values(country.currencies)
				.map((currency) => {
					return currency.name;
				})
				.join(", ")
		: "NA";
	parsedCountry.languages = country.languages
		? Object.values(country.languages).join(", ")
		: "NA";
	parsedCountry.borders = borderCountries.map((country) => {
		return country.name;
	});
	return parsedCountry;
};

const CountryDetail = () => {
	const { officialName } = useParams();
	const [country, setCountry] = useState(null);
	const { lightMode } = useContext(ThemeContext);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		let mounted = true;
		const fetchCountries = async () => {
			const mainCountry = await searchCountriesByExactName(officialName);
			const borderCountries = mainCountry[0].borders
				? await searchCountriesByCodes(mainCountry[0].borders)
				: [];
			if (mounted) {
				setCountry(parseCountryData(mainCountry[0], borderCountries));
			}
		};
		fetchCountries();
		return () => {
			mounted = false;
		};
	}, [location.pathname]);

	return (
		<main>
			<div className="back-button-wrapper">
				<IconButton
					icon={faArrowLeftLong}
					text="Back"
					className={`${
						lightMode ? "clr-vd-blue bg-white" : "clr-white bg-blue"
					}`}
					onClick={() => navigate(-1)}
				/>
			</div>
			{country ? (
				<div
					className={`country-details ${
						lightMode ? "clr-vd-blue" : "clr-white"
					}`}
				>
					<div className="country-flag-wrapper">
						<div
							className="country-flag"
							style={{ backgroundImage: `url(${country.flag})` }}
						></div>
					</div>
					<div className="country-info">
						<h2 className="country-name">{country.name}</h2>
						<div className="country-data">
							<ul>
								<li className="fs-m fw-s">
									<span className="fw-l">Native Name: </span>
									{country.nativeName}
								</li>
								<li className="fs-m fw-s">
									<span className="fw-l">Population: </span>
									{country.population}
								</li>
								<li className="fs-m fw-s">
									<span className="fw-l">Region: </span>
									{country.region}
								</li>
								<li className="fs-m fw-s">
									<span className="fw-l">Sub Region: </span>
									{country.subregion}
								</li>
								<li className="fs-m fw-s">
									<span className="fw-l">Capital: </span>
									{country.capital}
								</li>
							</ul>
							<ul>
								<li className="fs-m fw-s">
									<span className="fw-l">Top Level Domain: </span>
									{country.tld}
								</li>
								<li className="fs-m fw-s">
									<span className="fw-l">Currencies: </span>
									{country.currencies}
								</li>
								<li className="fs-m fw-s">
									<span className="fw-l">Languages: </span>
									{country.languages}
								</li>
							</ul>
						</div>
						{country.borders.length ? (
							<div className="border-countries fw-m fs-l">
								Border countries:
								<span className="buttons">
									{country.borders.map((countryNames) => {
										return (
											<Link
												to={`/details/${countryNames.official}`}
												className={`btn reset-anchor fs-m fw-s ${
													lightMode ? "bg-white" : "bg-blue"
												}`}
												key={countryNames.common}
											>
												{countryNames.common}
											</Link>
										);
									})}
								</span>
							</div>
						) : (
							""
						)}
					</div>
				</div>
			) : (
				<Loading />
			)}
		</main>
	);
};

export default CountryDetail;
