import { writeFile } from "node:fs/promises";
import { Buffer } from "node:buffer";
import { prepareSvelteComponent } from "./svelte-template.mjs";

const RequiredIcons = [
	{
		outline: "fluent:mail-inbox-all-24-regular",
		solid: "fluent:mail-inbox-all-24-filled",
		name: "Inbox"
	},
	{
		outline: "fluent:mail-inbox-24-regular",
		solid: "fluent:mail-inbox-24-filled",
		name: "EmptyInbox"
	},
	{
		outline: "fluent:notepad-person-24-regular",
		solid: "fluent:notepad-person-24-filled",
		name: "Notepad"
	},
	{
		outline: "fluent:settings-24-regular",
		solid: "fluent:settings-24-filled",
		name: "Settings"
	},
	{
		outline: "fluent:person-24-regular",
		solid: "fluent:person-24-filled",
		name: "Person"
	},
	{
		path: "logos:google-icon",
		name: "Google"
	},
	// general
	{
		outline: "fluent:delete-24-regular",
		solid: "fluent:delete-24-filled",
		name: "Delete"
	},
	{
		outline: "fluent:upload-24-regular",
		solid: "fluent:upload-24-filled",
		name: "Upload"
	},
	{
		outline: "fluent:dismiss-circle-24-regular",
		solid: "fluent:dismiss-circle-24-filled",
		name: "Close"
	},
	{
		outline: "fluent:chevron-down-24-regular",
		solid: "fluent:chevron-down-24-filled",
		name: "ChevronDown"
	}
];

const getName = (name) => "../../src/lib/icons/" + name + "Icon" + ".svelte";

RequiredIcons.forEach(async (detail) => {
	const component = prepareSvelteComponent(detail);
	const pathname = new URL(getName(detail.name), import.meta.url);

	try {
		const data = new Uint8Array(Buffer.from(component));
		await writeFile(pathname, data);
	} catch (err) {
		// When a request is aborted - err is an AbortError
		console.error(err);
	}
});
