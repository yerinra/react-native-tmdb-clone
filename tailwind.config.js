/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#0d253f",
				secondary: "#8acda5",
				text: "#E0E2E1",
			},
			fontFamily: {
				interThin: ["Inter-Thin", "sans-serif"],
				interSemiBold: ["Inter-SemiBold", "sans-serif"],
				interRegular: ["Inter-Regular", "sans-serif"],
				interMedium: ["Inter-Medium", "sans-serif"],
				interLight: ["Inter-Light", "sans-serif"],
				interExtraLight: ["Inter-ExtraLight", "sans-serif"],
				interExtraBold: ["Inter-ExtraBold", "sans-serif"],
				interBold: ["Inter-Bold", "sans-serif"],
				interBlack: ["Inter-Black", "sans-serif"],
			},
		},
	},
	plugins: [],
};
