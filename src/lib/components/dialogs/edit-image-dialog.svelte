<script lang="ts" module>
	export const createImage = (url: string): Promise<HTMLImageElement> =>
		new Promise((resolve, reject) => {
			const image = new Image();
			image.addEventListener("load", () => resolve(image));
			image.addEventListener("error", (error) => reject(error));
			image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
			image.src = url;
		});

	export function getRadianAngle(degreeValue: number) {
		return (degreeValue * Math.PI) / 180;
	}

	/**
	 * Returns the new bounding area of a rotated rectangle.
	 */
	export function rotateSize(width: number, height: number, rotation: number) {
		const rotRad = getRadianAngle(rotation);

		return {
			width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
			height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
		};
	}

	/**
	 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
	 */
	export async function getCroppedImg(
		imageSrc: string,
		pixelCrop: {
			x: number;
			y: number;
			width: number;
			height: number;
		},
		rotation = 0,
		flip = { horizontal: false, vertical: false }
	): Promise<string | null> {
		const image = await createImage(imageSrc);
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		if (!ctx) {
			return null;
		}

		const rotRad = getRadianAngle(rotation);

		// calculate bounding box of the rotated image
		const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
			image.width,
			image.height,
			rotation
		);

		// set canvas size to match the bounding box
		canvas.width = bBoxWidth;
		canvas.height = bBoxHeight;

		// translate canvas context to a central location to allow rotating and flipping around the center
		ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
		ctx.rotate(rotRad);
		ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
		ctx.translate(-image.width / 2, -image.height / 2);

		// draw rotated image
		ctx.drawImage(image, 0, 0);

		// croppedAreaPixels values are bounding box relative
		// extract the cropped image using these values
		const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

		// set canvas width to final desired crop size - this will clear existing context
		canvas.width = pixelCrop.width;
		canvas.height = pixelCrop.height;

		// paste generated rotate image at the top left corner
		ctx.putImageData(data, 0, 0);

		// As Base64 string
		// return canvas.toDataURL('image/jpeg');

		// As a blob
		return new Promise((resolve, reject) => {
			canvas.toBlob((file) => {
				resolve(file ? URL.createObjectURL(file) : null);
			}, "image/jpeg");
		});
	}
</script>

<script lang="ts">
	import Cropper from "svelte-easy-crop";
	import Button from "$lib/components/ui/button/button.svelte";
	import { buttonVariants } from "$lib/components/ui/button";
	import Slider from "../ui/form/slider.svelte";
	import UploadIcon from "$lib/icons/UploadIcon.svelte";
	import * as Dialog from "./root";
	import DeleteIcon from "$lib/icons/DeleteIcon.svelte";

	let crop = $state({ x: 0, y: 0 });
	let zoom: number = $state(1);
	let open = $state(false);
	let loading = $state(false);

	let {
		imageSrc,
		handleUploadImage,
		handleDeleteImage
	}: {
		imageSrc: string | null | undefined;
		handleUploadImage: (prop: string | null) => Promise<void>;
		handleDeleteImage: () => Promise<void>;
	} = $props();

	let image: string | null = $state(null);
	let fileinput = $state();
	let pixelCrop: { x: number; y: number; width: number; height: number } | null = $state(null);
	let croppedImage: string | null = $state(null);

	function onFileSelected(e: any) {
		let imageFile = e.target.files[0];
		let reader = new FileReader();
		reader.onload = (e) => {
			if (typeof e.target?.result === "string") image = e.target.result;
		};
		reader.readAsDataURL(imageFile);
	}

	function previewCrop(e: any) {
		pixelCrop = e.pixels;
	}

	async function cropImage() {
		if (image && pixelCrop) {
			croppedImage = await getCroppedImg(image, pixelCrop);
			wrapAction(handleUploadImage(croppedImage));
		}
	}

	function reset() {
		croppedImage = null;
		image = null;
	}

	async function wrapAction(action: Promise<void>) {
		loading = true;
		action.then(() => {
			open = false;
			loading = false;
		});
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class={buttonVariants({ variant: "default", class: "gap-x-2", size: "xs" })}>
		Edit
	</Dialog.Trigger>
	<Dialog.Content>
		<div class="cropper flex flex-col items-center justify-center">
			{#if !image}
				<div class="bg-muted flex h-60 max-h-60 w-60 items-center justify-start rounded-full">
					{#if imageSrc}
						<!-- svelte-ignore a11y_img_redundant_alt -->
						<img class="h-60 w-60 rounded-full" src={imageSrc} alt="Upload Image Alt" />
					{:else}
						<p>No Target</p>
					{/if}
				</div>
			{:else}
				<div class="crop-container h-60 max-h-60 w-60 rounded-full">
					<div class="relative mb-8 h-60 w-60 rounded-full">
						<Cropper {image} bind:crop bind:zoom aspect={1} oncropcomplete={previewCrop} />
					</div>
					<Slider
						type="single"
						bind:value={zoom}
						min={1}
						max={3}
						step={0.1}
						onValueChange={(value) => (zoom = value < 1 ? 1 : value)}
					/>
				</div>
			{/if}
		</div>
		<div
			class="mt-4 flex w-full flex-col items-center justify-center gap-y-4"
			class:mt-12={!!image}
		>
			<div class="flex items-center gap-4" class:flex-col={!!!image}>
				<label
					aria-disabled={loading}
					class={buttonVariants({
						variant: "secondary",
						size: "xs",
						class: "aria-disabled:pointer-events-none aria-disabled:opacity-50"
					})}
				>
					<input
						onchange={(e) => !loading && onFileSelected(e)}
						bind:this={fileinput}
						type="file"
						name="profile-image"
						placeholder="Upload Image"
						class="pointer-events-none absolute mt-4 opacity-0"
						accept="image/*"
					/>
					{#if image}
						Change
					{:else}
						<UploadIcon /> Upload Image
					{/if}
				</label>
				{#if image}
					<Button disabled={loading} onclick={() => reset()} variant="destructive" size="xs"
						>Reset</Button
					>
				{:else if imageSrc}
					<Button
						onclick={() => {
							wrapAction(handleDeleteImage());
						}}
						disabled={loading}
						variant="destructive"
						size="xs"
					>
						<DeleteIcon />
						{#if loading}
							Deleting
						{:else}
							Delete
						{/if}
					</Button>
				{/if}
			</div>
			{#if image}
				<Button
					onclick={() => {
						cropImage();
					}}
					size="sm"
					disabled={loading}
				>
					<UploadIcon />
					{#if loading}
						Uploading
					{:else}
						Upload
					{/if}
				</Button>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
