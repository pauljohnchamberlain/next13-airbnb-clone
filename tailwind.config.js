const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		colors: {
			...colors, // spread the existing colors
			primary: colors.rose['500'],
			secondary: colors.red['800'],
			// ...
		},
	},
	plugins: [],
};
