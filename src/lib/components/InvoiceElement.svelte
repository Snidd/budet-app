<script lang="ts">
	import { updateInvoice } from '$lib/dal/updateInvoice';
	import type { BudgetInvoice } from '$model';
	import Icon from '@iconify/svelte';

	export let invoice: BudgetInvoice;

	const toggleDone = () => {
		updateInvoice(invoice._id, { done: !invoice.done });
	};

	let inputValue = -1;
	let originalValue = -1;
	$: setInputValue(invoice._id);
	const setInputValue = (_id: string) => {
		inputValue = invoice.current;
	};

	let isEditingValue = false;

	const startEditingValue = () => {
		isEditingValue = true;
		return;
	};

	const cancelEditingValue = () => {
		isEditingValue = false;
		inputValue = originalValue;
	};

	const stopEditingValue = () => {
		isEditingValue = false;
		originalValue = inputValue;
		updateInvoice(invoice._id, {
			current: new Number(inputValue).valueOf(),
			total: new Number(inputValue).valueOf()
		});
		return;
	};
</script>

<div class="bg-slate-200 rounded-md drop-shadow-md p-3 w-96 flex justify-center items-center">
	<div class="flex-grow {invoice.done ? 'line-through text-slate-500' : ''}">{invoice.text}</div>
	<div
		on:click={() => startEditingValue()}
		class="font-mono w-20 text-right {invoice.done ? 'line-through text-slate-500' : ''}"
	>
		{#if isEditingValue}
			<!-- svelte-ignore a11y-autofocus -->
			<input
				class="text-right w-full outline-2 outline-dotted"
				autofocus={true}
				bind:value={inputValue}
				on:keypress={(event) => {
					if (event.key === 'Enter') stopEditingValue();
				}}
				on:keyup={(event) => {
					if (event.key === 'Escape') {
						cancelEditingValue();
						return;
					}
				}}
				on:blur={() => stopEditingValue()}
			/>
		{:else}
			{invoice.current}
		{/if}
	</div>
	<div class="font-mono {invoice.done ? 'line-through text-slate-500' : ''}">:-</div>
	<div on:click={() => toggleDone()} class="ml-3 hover:opacity-60 cursor-pointer">
		<Icon icon="carbon:checkmark-filled" />
	</div>
</div>
