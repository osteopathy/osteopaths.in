<script lang="ts">
import FluentDismissCircle24Filled from "virtual:icons/fluent/dismiss-circle-24-filled";
import FluentDismissCircle24Regular from "virtual:icons/fluent/dismiss-circle-24-regular";

type Props = {
    class?:string
};
const { class: className, ...attrs }: Props = $props();
</script>
<span class="relative">
    <FluentDismissCircle24Regular
        shape-rendering="geometricPrecision"
        class={`size-5 group-focus-visible:opacity-0 group-aria-[current='page']:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-aria-[current='page']:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-aria-[current='page']:duration-300 group-hover:duration-300`+" "+className}
        {...attrs}
    />
    <FluentDismissCircle24Filled
        shape-rendering="geometricPrecision"
        class={`size-5 absolute opacity-0 group-aria-[current='page']:opacity-100 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95  group-aria-[current='page']:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100`+" "+className}
          {...attrs}
    />
</span>
