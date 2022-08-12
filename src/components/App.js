import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Route, Routes, HashRouter } from "react-router-dom";
import CountryDetail from "./CountryDetail";
import Countries from "./Countries";
import NavBar from "./NavBar";
import { FilterProvider } from "../context/FilterContext";

function App() {
	const { lightMode } = useContext(ThemeContext);

	return (
		<div className={`App ${lightMode ? "bg-vl-gray" : "bg-d-blue"}`}>
			<FilterProvider>
				<HashRouter>
					<NavBar />
					<Routes>
						<Route exact path="/" element={<Countries />} />
						<Route
							exact
							path="/details/:officialName"
							element={<CountryDetail />}
						/>
					</Routes>
				</HashRouter>
			</FilterProvider>
		</div>
	);
}

export default App;
