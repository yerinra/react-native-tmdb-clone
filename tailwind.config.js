/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			dropShadow: {
				glow: ["0 0px 20px rgba(255,255, 255, 0.35)", "0 0px 65px rgba(255, 255,255, 0.2)"],
			},
			colors: {
				primary: "#0b101f",
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
