<script lang="ts" module>
	import type { ButtonRootProps } from "bits-ui";

	import { type VariantProps, tv } from "tailwind-variants";

	export const buttonVariants = tv({
		base: `
		focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none
		focus-visible:ring-offset-layer-0 focus-visible:ring-layer-13
		inline-flex items-center justify-center gap-2 whitespace-nowrap
		rounded-md text-sm font-medium transition-colors
		disabled:pointer-events-none disabled:opacity-50
		[&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0`,
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow",
				destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
				outline: "bg-layer-1 hover:bg-layer-3 border shadow-sm border-layer-6 hover:border-layer-7",
				secondary: "bg-layer-3 text-layer-12 hover:bg-layer-3/60 shadow-sm",
				ghost: "hover:bg-layer-3 hover:text-layer-12",
				link: "text-primary underline-offset-4 hover:underline"
			},
			size: {
				default: "h-9 px-4 py-2",
				xs: "h-6 px-2 py-1",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = ButtonRootProps & {
		variant?: ButtonVariant;
		size?: ButtonSize;
	};
</script>

<script lang="ts">
	import { Button } from "bits-ui";

	let {
		variant = "default",
		size = "default",
		ref = $bindable(null),
		children,
		class: className,
		...restProps
	}: ButtonProps = $props();
</script>

<Button.Root
	class={buttonVariants({ variant, size, className: className?.toString() })}
	{...restProps}
>
	{@render children?.()}
</Button.Root>
