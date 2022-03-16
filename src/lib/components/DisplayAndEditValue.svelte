<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let inputValue: string | number;
	export let isEditing = false;

	const dispatch = createEventDispatcher();

	let originalValue = inputValue;

	const cancelEditing = () => {
		isEditing = false;
		inputValue = originalValue;
	};

	const stopEditing = () => {
		isEditing = false;
		if (originalValue !== inputValue) {
			originalValue = inputValue;
			dispatch('update', inputValue);
		}
		return;
	};

	let _inputField: HTMLInputElement;
</script>

{#if isEditing}
	<!-- svelte-ignore a11y-autofocus -->
	<input
		class="w-full outline-2 outline-dotted -m-1 p-1 {$$props.class}"
		autofocus={true}
		bind:this={_inputField}
		bind:value={inputValue}
		on:keypress={(event) => {
			if (event.key === 'Enter') stopEditing();
		}}
		on:keyup={(event) => {
			if (event.key === 'Escape') {
				cancelEditing();
				return;
			}
		}}
		on:focus={() => console.log('test')}
		on:blur={() => stopEditing()}
	/>
{:else}
	<span>{inputValue}</span>
{/if}
