/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		screens: {
			mb: "320px",
			tb: "640px",
			lt: "1024px",
			dt: "1280px",
		},
		colors: {
			mainBg: "var(--mainBg)",
			mainText: "var(--mainText)",
			bgHighlight: "var(--bgHighlight)",
			textBlack: "var(--textBlack)",
			strongHighlight: "var(--strongHighlight)",
			textHightLight: "var(--textHightLight)",
			textWhite: "var(--textWhite)",
			topHeadline: "var(--topHeadline)",
		},
	},
	plugins: [],
	darkMode: "class",
};
