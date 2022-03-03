<script lang="ts">
	import { tdClasses } from '$lib/constants/tdClasses';
	import { addCategoryRow, updateCategoryRow } from '$lib/dal';
	import { allMonths } from '$lib/stores/allMonths';

	import { selectedRow } from '$lib/stores/selectedRow';

	import type { BudgetCategoryRow } from '$model';
	import { tick } from 'svelte';
	import { scale } from 'svelte/transition';
	import AddCategoryRow from './AddCategoryRow.svelte';
	import Button from './Button.svelte';
	import ElementCell from './ElementCell.svelte';
	import RowMenu from './RowMenu.svelte';

	export let row: BudgetCategoryRow;
	export let isCopy = false;

	const toggleSelectRow = async (
		row: BudgetCategoryRow,
		isSelected: boolean | null,
		value: boolean
	) => {
		if (isSelected && !value) {
			selectedRow.set(null);
			await tick();
		}
		if (!isSelected && value) {
			selectedRow.set(row);
			await tick();
		}
	};

	let rowSelected: boolean = false;

	const isSelected = (selRow: BudgetCategoryRow, id: number): boolean => {
		if (isCopy) return false;
		return selRow && selRow.id === id;
	};

	$: rowSelected = isSelected($selectedRow, row.id);

	let isEditingRow: number | null = null;

	let inputValue = row.name;

	const toggleEditName = async (row: BudgetCategoryRow, done = false) => {
		if (done) {
			updateCategoryRow({ ...row, name: inputValue });
			isEditingRow = null;
			return;
		}
		isEditingRow = row.id;
	};
</script>

<tr
	on:click={() => toggleSelectRow(row, rowSelected, true)}
	class="whitespace-nowrap {isCopy ? 'bg-orange-100' : ''} {row.isIncome
		? 'bg-green-100'
		: ''} group {rowSelected ? 'bg-gray-100' : ''}"
	transition:scale={{ duration: 100 }}
>
	<td class={tdClasses}
		>{#if rowSelected}<RowMenu {row} />{/if}
		{#if !isCopy}
			<AddCategoryRow {row} />
		{/if}
		<div
			class="flex"
			on:click|stopPropagation={() => toggleSelectRow(row, rowSelected, !rowSelected)}
		>
			{#if isEditingRow === row.id}
				<!-- svelte-ignore a11y-autofocus -->
				<input
					autofocus={true}
					bind:value={inputValue}
					on:blur={() => toggleEditName(row, true)}
					on:keypress={(event) => {
						if (event.key === 'Enter') toggleEditName(row, true);
					}}
					class="w-full text-left outline-2 outline-dotted pr-2"
					type="text"
				/>
			{:else}
				{row.name}
				<img
					on:click|stopPropagation={() => toggleEditName(row)}
					src="/edit.svg"
					class="ml-3 mt-1 h-3 w-3 group-hover:visible invisible cursor-pointer hover:opacity-60"
					alt="Edit"
				/>
			{/if}
		</div></td
	>
	{#each $allMonths as month}
		<ElementCell {row} {month} />
	{/each}
</tr>
