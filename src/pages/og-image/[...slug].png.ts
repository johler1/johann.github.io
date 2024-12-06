import RobotoMonoBold from "@/assets/roboto-mono-700.ttf";
import RobotoMono from "@/assets/roboto-mono-regular.ttf";
import { getAllPosts } from "@/data/post";
import { siteConfig } from "src/site.config";
import { getFormattedDate } from "@/utils/date";
import { Resvg } from "@resvg/resvg-js";
import type { APIContext, InferGetStaticPropsType } from "astro";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";

const ogOptions: SatoriOptions = {
	// debug: true,
	fonts: [
		{
			data: Buffer.from(RobotoMono),
			name: "Roboto Mono",
			style: "normal",
			weight: 400,
		},
		{
			data: Buffer.from(RobotoMonoBold),
			name: "Roboto Mono",
			style: "normal",
			weight: 700,
		},
	],
	height: 630,
	width: 1200,
};

const markup = (title: string, pubDate: string) =>
	html`<div tw="flex flex-col w-full h-full bg-[#1d1f21] text-[#c9cacc]">
		<div tw="flex flex-col flex-1 w-full p-10 justify-center">
			<p tw="text-2xl mb-6">${pubDate}</p>
			<h1 tw="text-6xl font-bold leading-snug text-white">${title}</h1>
		</div>
		<div tw="flex items-center justify-between w-full p-10 border-t border-[#2bbc89] text-xl">
			<div tw="flex items-center">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1080" zoomAndPan="magnify" viewBox="0 0 810 809.999993" height="1080" preserveAspectRatio="xMidYMid meet" version="1.0"><defs>
<g/></defs><g fill="#88d499" fill-opacity="1">
<g transform="translate(64.559436, 545.624993)">
<g> <path d="M 325.34375 -130.5 C 325.34375 -107.101562 320.914062 -86.628906 312.0625 -69.078125 C 303.21875 -51.523438 291.296875 -36.820312 276.296875 -24.96875 C 261.296875 -13.125 244.492188 -4.28125 225.890625 1.5625 C 207.296875 7.414062 188.097656 10.34375 168.296875 10.34375 C 148.492188 10.34375 129.289062 7.414062 110.6875 1.5625 C 92.09375 -4.28125 75.296875 -13.125 60.296875 -24.96875 C 45.296875 -36.820312 33.367188 -51.523438 24.515625 -69.078125 C 15.671875 -86.628906 11.25 -107.101562 11.25 -130.5 L 11.25 -196.65625 L 160.203125 -196.65625 L 160.203125 -140.40625 L 173.703125 -140.40625 L 173.703125 -315.453125 L 325.34375 -315.453125 Z M 325.34375 -130.5 "/>
</g></g></g>
<g fill="#88d499" fill-opacity="1">
<g transform="translate(398.458812, 545.624993)">
<g> <path d="M 172.34375 -325.796875 C 195.445312 -325.796875 217.125 -321.445312 237.375 -312.75 C 257.625 -304.050781 275.472656 -291.972656 290.921875 -276.515625 C 306.367188 -261.066406 318.441406 -243.21875 327.140625 -222.96875 C 335.847656 -202.71875 340.203125 -181.046875 340.203125 -157.953125 C 340.203125 -134.847656 335.847656 -113.171875 327.140625 -92.921875 C 318.441406 -72.671875 306.367188 -54.820312 290.921875 -39.375 C 275.472656 -23.925781 257.625 -11.847656 237.375 -3.140625 C 217.125 5.554688 195.445312 9.90625 172.34375 9.90625 C 149.25 9.90625 127.578125 5.554688 107.328125 -3.140625 C 87.078125 -11.847656 69.222656 -23.925781 53.765625 -39.375 C 38.316406 -54.820312 26.242188 -72.671875 17.546875 -92.921875 C 8.847656 -113.171875 4.5 -134.847656 4.5 -157.953125 C 4.5 -181.046875 8.847656 -202.71875 17.546875 -222.96875 C 26.242188 -243.21875 38.316406 -261.066406 53.765625 -276.515625 C 69.222656 -291.972656 87.078125 -304.050781 107.328125 -312.75 C 127.578125 -321.445312 149.25 -325.796875 172.34375 -325.796875 Z M 172.34375 -325.796875 "/>
</g></g></g>
<g fill="#354eab" fill-opacity="1">
<g transform="translate(64.559436, 517.499994)">
<g> <path d="M 325.34375 -130.5 C 325.34375 -107.101562 320.914062 -86.628906 312.0625 -69.078125 C 303.21875 -51.523438 291.296875 -36.820312 276.296875 -24.96875 C 261.296875 -13.125 244.492188 -4.28125 225.890625 1.5625 C 207.296875 7.414062 188.097656 10.34375 168.296875 10.34375 C 148.492188 10.34375 129.289062 7.414062 110.6875 1.5625 C 92.09375 -4.28125 75.296875 -13.125 60.296875 -24.96875 C 45.296875 -36.820312 33.367188 -51.523438 24.515625 -69.078125 C 15.671875 -86.628906 11.25 -107.101562 11.25 -130.5 L 11.25 -196.65625 L 160.203125 -196.65625 L 160.203125 -140.40625 L 173.703125 -140.40625 L 173.703125 -315.453125 L 325.34375 -315.453125 Z M 325.34375 -130.5 "/>
</g></g></g>
<g fill="#354eab" fill-opacity="1">
<g transform="translate(398.458812, 517.499994)">
<g> <path d="M 172.34375 -325.796875 C 195.445312 -325.796875 217.125 -321.445312 237.375 -312.75 C 257.625 -304.050781 275.472656 -291.972656 290.921875 -276.515625 C 306.367188 -261.066406 318.441406 -243.21875 327.140625 -222.96875 C 335.847656 -202.71875 340.203125 -181.046875 340.203125 -157.953125 C 340.203125 -134.847656 335.847656 -113.171875 327.140625 -92.921875 C 318.441406 -72.671875 306.367188 -54.820312 290.921875 -39.375 C 275.472656 -23.925781 257.625 -11.847656 237.375 -3.140625 C 217.125 5.554688 195.445312 9.90625 172.34375 9.90625 C 149.25 9.90625 127.578125 5.554688 107.328125 -3.140625 C 87.078125 -11.847656 69.222656 -23.925781 53.765625 -39.375 C 38.316406 -54.820312 26.242188 -72.671875 17.546875 -92.921875 C 8.847656 -113.171875 4.5 -134.847656 4.5 -157.953125 C 4.5 -181.046875 8.847656 -202.71875 17.546875 -222.96875 C 26.242188 -243.21875 38.316406 -261.066406 53.765625 -276.515625 C 69.222656 -291.972656 87.078125 -304.050781 107.328125 -312.75 C 127.578125 -321.445312 149.25 -325.796875 172.34375 -325.796875 Z M 172.34375 -325.796875 "/>
</g></g></g>
</svg>
				<p tw="ml-3 font-semibold">${siteConfig.title}</p>
			</div>
			<p>by ${siteConfig.author}</p>
		</div>
	</div>`;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export async function GET(context: APIContext) {
	const { pubDate, title } = context.props as Props;

	const postDate = getFormattedDate(pubDate, {
		month: "long",
		weekday: "long",
	});
	const svg = await satori(markup(title, postDate), ogOptions);
	const png = new Resvg(svg).render().asPng();
	return new Response(png, {
		headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
			"Content-Type": "image/png",
		},
	});
}

export async function getStaticPaths() {
	const posts = await getAllPosts();
	return posts
		.filter(({ data }) => !data.ogImage)
		.map((post) => ({
			params: { slug: post.slug },
			props: {
				pubDate: post.data.updatedDate ?? post.data.publishDate,
				title: post.data.title,
			},
		}));
}
