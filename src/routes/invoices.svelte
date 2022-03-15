<script lang="ts">
	import InvoiceElement from '$lib/components/InvoiceElement.svelte';
	import { addInvoice } from '$lib/dal/addInvoice';
	import { activeInvoices, inactiveInvoices } from '$lib/stores';
	import type { BudgetInvoice } from '$model';
	import Icon from '@iconify/svelte';

	const getTotal = (elements: BudgetInvoice[]): number => {
		if (elements && elements.length > 0) {
			return elements.reduce((prev, cur) => {
				return prev + cur.current;
			}, 0);
		}
		return 0;
	};

	$: activeTotal = getTotal($activeInvoices);
</script>

<div class="flex gap-x-4">
	<div class="flex flex-col gap-y-2 justify-start items-start">
		<div class="bg-slate-400 rounded-md drop-shadow-md p-3 w-20 text-center">Aktiva</div>
		{#each $activeInvoices as invoice}
			<InvoiceElement {invoice} />
		{/each}
		<div class="bg-slate-400 rounded-md drop-shadow-md p-3 w-96 flex border border-gray-300">
			<span class="flex-grow underline underline-offset-4">Totalt</span>
			<span class="font-mono">{activeTotal}:-</span>
			<span class="w-7">&nbsp;</span>
		</div>
		<button
			on:click={() => addInvoice('Ny räkning')}
			class="p-2 gap-x-2 flex justify-center items-center drop-shadow-lg rounded-md bg-blue-400 hover:bg-blue-300 hover:border-blue-200 border border-blue-300"
			><Icon icon="carbon:add-alt" /><span>Lägg till räkning</span></button
		>
	</div>
	<div class="flex flex-col gap-y-2">
		<div class="bg-slate-400 rounded-md drop-shadow-md p-3 w-20 text-center">Inaktiva</div>
		{#each $inactiveInvoices as invoice}
			<InvoiceElement {invoice} />
		{/each}
	</div>
</div>
