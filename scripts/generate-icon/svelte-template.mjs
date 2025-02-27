// any combination of spaces and punctuation characters
// thanks to http://stackoverflow.com/a/25575009
const wordSeparators = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;

//👆 convert hero_icon to HeroIcon
export function pascalCase(str) {
	var words = str.split(wordSeparators);
	var len = words.length;
	var mappedWords = new Array(len);
	for (var i = 0; i < len; i++) {
		var word = words[i];
		if (word === "") {
			continue;
		}
		mappedWords[i] = word[0].toUpperCase() + word.slice(1);
	}
	return mappedWords.join("");
}

const useCN = false;

const cn = {
	import: useCN ? `import { cn } from "$lib/utils"\n` : "",
	use: (str, dyn) => (useCN ? `cn(` + str + "," + dyn + `)` : str + '+" "+' + dyn)
};

const shared = `${cn.import}
type Props = {
    class?:string
};
const { class: className, ...attrs }: Props = $props();`;

export const prepareSvelteComponent = (props) => {
	if (props?.svg) {
		return `<script lang="ts">
${shared}
</script>
${props.svg(`
    shape-rendering="geometricPrecision"
    class={${cn.use(`"size-6 group-active:scale-100 group-hover:scale-105 transition-transform"`, "className")}}
    {...attrs}
`)}>
`;
	} else if (props?.solid && props?.outline) {
		const [solidPack, ..._solidIcon] = props?.solid.split(":");
		const [outlinePack, ..._outlineIcon] = props?.outline.split(":");
		//  import Recevied  from "virtual:icons/heroicons-outline/plus-circle"
		const SolidIconName = pascalCase(solidPack) + pascalCase(_solidIcon.join(""));
		const OutlineIconName = pascalCase(outlinePack) + pascalCase(_outlineIcon.join(""));
		return `<script lang="ts">
import ${SolidIconName} from "virtual:icons/${solidPack}/${_solidIcon}";
import ${OutlineIconName} from "virtual:icons/${outlinePack}/${_outlineIcon}";
${shared}
</script>
<span class="relative">
    <${OutlineIconName}
        shape-rendering="geometricPrecision"
        class={${cn.use(`\`size-5 group-focus-visible:opacity-0 group-aria-[current='page']:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-aria-[current='page']:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-aria-[current='page']:duration-300 group-hover:duration-300\``, "className")}}
        {...attrs}
    />
    <${SolidIconName}
        shape-rendering="geometricPrecision"
        class={${cn.use(`\`size-5 absolute opacity-0 group-aria-[current='page']:opacity-100 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95  group-aria-[current='page']:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100\``, "className")}}
          {...attrs}
    />
</span>
`;
	} else {
		const [pack, ..._name] = props?.path.split(":");
		//  import Recevied  from "virtual:icons/heroicons-outline/plus-circle"
		const Recevied = pascalCase(pack) + pascalCase(_name.join(""));
		return `<script lang="ts" >
import ${Recevied} from "virtual:icons/${pack}/${_name}";
${shared}
</script>
<${Recevied}
    shape-rendering="geometricPrecision"
    class={${cn.use(`"size-6 group-active:scale-100 group-hover:scale-105 transition-transform"`, "className")}}
    {...attrs}
/>
`;
	}
};
