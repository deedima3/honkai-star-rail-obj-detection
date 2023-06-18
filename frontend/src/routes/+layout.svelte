<script>
	import '../app.postcss';
	import '@fontsource/poppins'; // Defaults to weight 400
	import '@fontsource/poppins/100.css';
	import '@fontsource/poppins/200.css';
	import '@fontsource/poppins/300.css';
	import '@fontsource/poppins/400.css'; // Specify weight
	import '@fontsource/poppins/500.css';
	import '@fontsource/poppins/600.css';
	import '@fontsource/poppins/700.css';
	import '@fontsource/poppins/800.css'; // Specify weight and style
</script>

<div class="w-full flex flex-col gap-5 justify-center items-center mx-auto">
	<slot />
</div>

<style>
	:global(body) {
		background: #2d3748;
		font-family: 'Poppins';
	}
</style>
