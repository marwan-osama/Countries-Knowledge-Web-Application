import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
	const [lightMode, setLightMode] = useState(() => {
		if (localStorage.getItem("whereintheworld")) {
			return JSON.parse(localStorage.getItem("whereintheworld")).lightMode;
		}
	});

	const toggleLightMode = () => {
		setLightMode(!lightMode);
	};

	useEffect(() => {
		localStorage.setItem("whereintheworld", JSON.stringify({ lightMode }));
	}, [lightMode]);

	if (lightMode) {
		document.body.className = "bg-vl-gray";
	} else {
		document.body.className = "bg-d-blue";
	}

	return (
		<ThemeContext.Provider value={{ lightMode, toggleLightMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

export { ThemeContext, ThemeProvider };
