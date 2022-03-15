<script lang="ts">
	import { updateInvoice } from '$lib/dal/updateInvoice';
	import type { BudgetInvoice } from '$model';
	import Icon from '@iconify/svelte';

	export let invoice: BudgetInvoice;

	const toggleDone = () => {
		updateInvoice(invoice._id, { done: !invoice.done });
	};
</script>

<div class="bg-slate-200 rounded-md drop-shadow-md p-3 w-96 flex justify-center items-center">
	<div class="flex-grow {invoice.done ? 'line-through text-slate-500' : ''}">{invoice.text}</div>
	<div class="font-mono {invoice.done ? 'line-through text-slate-500' : ''}">
		{invoice.current}
	</div>
	<div class="font-mono {invoice.done ? 'line-through text-slate-500' : ''}">:-</div>
	<div on:click={() => toggleDone()} class="ml-3 hover:opacity-60 cursor-pointer">
		<Icon icon="carbon:checkmark-filled" />
	</div>
</div>
