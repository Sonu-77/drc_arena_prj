import localFont from "next/font/local";

export const reckless = localFont({
	src: [
		{
			path: "../public/fonts/reckless/Reckless-Light.woff2",
			weight: "300",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-reckless",
});