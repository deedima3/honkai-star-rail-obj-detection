<script lang="ts">
	export let onClick: () => void;
</script>

<button class="text-white bg-brand border-white border-2 px-5 py-2 text-sm" on:click={onClick}>
	<slot />
</button>
