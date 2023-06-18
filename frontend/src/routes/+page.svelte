<script lang="ts">
	import Button from '../components/Button/Button.svelte';
	import OpenCvTest from '../components/CV/OpenCVTest.svelte';
	import cv from '@techstark/opencv-js';
	import { Tensor, InferenceSession } from 'onnxruntime-web';
	import { detectImage } from '../utils/detect';
	import { download } from '../utils/download';

	let imageString: string;
	let fileInputRef: HTMLInputElement;
	let session;
	let loading: boolean = false;
	let canvas: HTMLCanvasElement;
	let imageRef: HTMLImageElement;

	const modelInputShape = [1, 3, 1280, 1280];
	const topk = 100;
	const iouThreshold = 0.45;
	const scoreThreshold = 0.25;

	const onFileSelected = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		if (imageString) {
			URL.revokeObjectURL(imageString);
			imageString = null;
		}
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			imageString = e.target.result as string;
		};
	};

	const clearImage = () => {
		imageString = '';
	};

	cv['onRuntimeInitialized'] = async () => {
		// create session
		const arrBufNet = await download(
			`/hsr-object-detection.onnx` // url
		);
		const yolov8 = await InferenceSession.create(arrBufNet);
		const arrBufNMS = await download(
			`/nms-yolov8.onnx` // url
		);
		const nms = await InferenceSession.create(arrBufNMS);

		// warmup main model
		loading = true;
		const tensor = new Tensor(
			'float32',
			new Float32Array(modelInputShape.reduce((a, b) => a * b)),
			modelInputShape
		);
		await yolov8.run({ images: tensor });

		session = { net: yolov8, nms: nms };
		loading = false;
	};
</script>

<div class="w-full max-w-screen-xl mx-auto flex flex-col items-center mt-24">
	<h1 class="text-white text-5xl font-bold">Honkai Star Rail Object Recognition</h1>
	<h3 class="text-white text-xl mt-2">Waifu recognition using YoloV8 transfer learning</h3>
	{#if imageString}
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<div class="relative w-fulll max-w-screen-md max-h-[1280px]">
			<img
				src={imageString}
				alt="HSR Image"
				class="w-full max-w-screen-md mt-16 static"
				on:load={() => {
					detectImage(
						imageRef,
						canvas,
						session,
						topk,
						iouThreshold,
						scoreThreshold,
						modelInputShape
					);
				}}
				bind:this={imageRef}
			/>
			<canvas
				id="canvas"
				class="w-full h-full absolute z-10 top-0"
				width={modelInputShape[2]}
				height={modelInputShape[3]}
				bind:this={canvas}
			/>
		</div>
	{/if}
	{#if session}
		<div class="flex gap-10 mt-16">
			<Button
				onClick={() => {
					fileInputRef.click();
				}}
			>
				Upload Image
			</Button>
			<Button
				onClick={() => {
					URL.revokeObjectURL(imageString);
					clearImage();
				}}
			>
				Clear Image
			</Button>
		</div>
	{/if}
	<input
		style="display:none"
		type="file"
		accept=".jpg, .jpeg, .png"
		on:change={(e) => onFileSelected(e)}
		bind:this={fileInputRef}
	/>
</div>
