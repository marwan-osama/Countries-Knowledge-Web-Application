const baseUrl = "https://restcountries.com/v3.1/";
const fetchAllCounties = async () => {
	try {
		const response = await fetch(baseUrl + "all");
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
const searchCountriesByExactName = async (query) => {
	try {
		const response = await fetch(`${baseUrl}/name/${query}?fullText=true`);
		if (!response.ok) {
			return {};
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
const searchCountriesByName = async (query) => {
	try {
		const response = await fetch(`${baseUrl}/name/${query}`);
		if (!response.ok) {
			return {};
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
const searchCountriesByRegion = async (query) => {
	try {
		const response = await fetch(`${baseUrl}/region/${query}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
const searchCountriesByCodes = async (codes) => {
	try {
		const response = await fetch(`${baseUrl}/alpha?codes=${codes.join(",")}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export {
	fetchAllCounties,
	searchCountriesByName,
	searchCountriesByRegion,
	searchCountriesByCodes,
	searchCountriesByExactName,
};
