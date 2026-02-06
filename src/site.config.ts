import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	author: "Johann Ohler",
	description: "Johann Ohlers's personal website.",
	lang: "en-GB",
	ogLocale: "en_GB",
	title: "Johann Ohler - Personal Website",
};

export const menuLinks: { path: string; title: string }[] = [
	{
		path: "/#WIP",
		title: "Research",
	},
	{
		path: "/#Experience",
		title: "Experience",
	},
	{
		path: "/#Presentations",
		title: "Presentations",
	},
	{
		path: "/data/",
		title: "Data",
	},
];
