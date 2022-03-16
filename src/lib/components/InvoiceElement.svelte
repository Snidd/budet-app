<script lang="ts">
	import { updateInvoice } from '$lib/dal/updateInvoice';
	import type { BudgetInvoice } from '$model';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import DisplayAndEditValue from './DisplayAndEditValue.svelte';

	export let invoice: BudgetInvoice;

	const toggleDone = () => {
		updateInvoice(invoice._id, { done: !invoice.done });
	};

	let isEditingText = false;
	let isEditingValue = false;

	onMount(() => {
		if (invoice.new) {
			isEditingText = true;
		}
	});
</script>

<div class="bg-slate-200 rounded-md drop-shadow-md p-3 w-96 flex justify-center items-center">
	<div
		on:click={() => (isEditingText = true)}
		class="flex-grow {invoice.done ? 'line-through text-slate-500' : ''}"
	>
		<DisplayAndEditValue
			inputValue={invoice.text}
			bind:isEditing={isEditingText}
			on:update={(event) => updateInvoice(invoice._id, { text: event.detail })}
		/>
	</div>
	<div
		on:click={() => (isEditingValue = true)}
		class="font-mono w-20 text-right {invoice.done ? 'line-through text-slate-500' : ''}"
	>
		<DisplayAndEditValue
			class="text-right"
			inputValue={invoice.current}
			on:update={(event) =>
				updateInvoice(invoice._id, { current: new Number(event.detail).valueOf() })}
			bind:isEditing={isEditingValue}
		/>
	</div>
	<div class="font-mono {invoice.done ? 'line-through text-slate-500' : ''}">:-</div>
	<div on:click={() => toggleDone()} class="ml-3 hover:opacity-60 cursor-pointer">
		<Icon icon="carbon:checkmark-filled" />
	</div>
</div>
