<script lang="ts" >
import LogosGoogleIcon from "virtual:icons/logos/google-icon";

type Props = {
    class?:string
};
const { class: className, ...attrs }: Props = $props();
</script>
<LogosGoogleIcon
    shape-rendering="geometricPrecision"
    class={"size-6 group-active:scale-100 group-hover:scale-105 transition-transform"+" "+className}
    {...attrs}
/>
