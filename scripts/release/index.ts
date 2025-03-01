import { prompt } from "@astrojs/cli-kit";

import { log } from "./messages.ts";
import webapp from "../../package.json" with { type: "json" };

const exit = () => process.exit(0);
process.on("SIGINT", exit);
process.on("SIGTERM", exit);

log(webapp.version);

const versionIncrements = ["patch", "minor", "major"];

const tags = ["latest", "next"];

export async function main() {
	const version = prompt({
		name: "version",
		type: "select",
		message: "Select a version increment",
		choices: [
			{
				label: "Patch",
				value: "patch"
			},
			{
				label: "Minor",
				value: "minor"
			},
			{
				label: "Major",
				value: "major"
			}
		]
	});
	console.log(version);
}
main().then(() => {
	process.exit(0);
});
