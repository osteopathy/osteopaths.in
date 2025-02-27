import { Dialog as DialogPrimitive } from "bits-ui";

// import Title from "./dialog-title.svelte";
// import Footer from "./dialog-footer.svelte";
// import Header from "./dialog-header.svelte";
import Overlay from "./dialog-overlay.svelte";
import Content from "./dialog-content.svelte";
// import Description from "./dialog-description.svelte";

const Root: typeof DialogPrimitive.Root = DialogPrimitive.Root;
const Trigger: typeof DialogPrimitive.Trigger = DialogPrimitive.Trigger;
const Close: typeof DialogPrimitive.Close = DialogPrimitive.Close;
const Portal: typeof DialogPrimitive.Portal = DialogPrimitive.Portal;

export {
	Root,
	Portal,
	Trigger,
	Overlay,
	Content,
	Close,
	//
	Root as Dialog,
	Portal as DialogPortal,
	Trigger as DialogTrigger,
	Overlay as DialogOverlay,
	Content as DialogContent,
	Close as DialogClose
};
