import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				inter: [
					'Inter',
					...defaultTheme.fontFamily.sans
				],
				open: [
					'Open Sans',
					'sans-serif'
				],
				golos: [
					'Golos Text',
					'sans-serif'
				],
				poppins: ['Poppins', 'sans-serif']
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				mantis: {
					'50': '#f3fbf2',
					'100': '#e2f7e1',
					'200': '#c7eec4',
					'300': '#9bdf96',
					'400': '#76cd70',
					'500': '#42ac3b',
					'600': '#318e2b',
					'700': '#297025',
					'800': '#255922',
					'900': '#1f491e',
					'950': '#0b280b',
				},
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
