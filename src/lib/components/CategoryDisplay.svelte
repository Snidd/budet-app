<script lang="ts">
	import { getTotalForMonth } from '$lib/calculations/getTotalForMonth';
	import { tdClasses } from '$lib/constants/tdClasses';
	import { allElements } from '$lib/stores/allElements';
	import { allMonths } from '$lib/stores/allMonths';
	import type { BudgetElement, BudgetCategory, BudgetCategoryRow } from '$model/index';
	import { fade, scale } from 'svelte/transition';
	import AddCategoryRow from './AddCategoryRow.svelte';
	import CategoryRowDisplay from './CategoryRowDisplay.svelte';
	import StatusArrow from './StatusArrow.svelte';

	export let category: BudgetCategory;
	export let rows: BudgetCategoryRow[];

	let elements: BudgetElement[];
	const getElementsByRows = (elems: BudgetElement[], filteringRows: BudgetCategoryRow[]) => {
		if (elems) {
			return elems.filter(
				(elem) => filteringRows.findIndex((filterRow) => filterRow._id === elem.rowId) > -1
			);
		}
		return [];
	};

	$: elements = getElementsByRows($allElements, rows);

	export let isIncome = false;
	export let isCopy = false;

	let showDetails = false;
</script>

<tr
	class="whitespace-nowrap cursor-pointer hover:bg-slate-200 border border-gray-300"
	on:click={() => (showDetails = !showDetails)}
>
	<td class="font-bold {tdClasses} flex"
		><div>{category.name}</div>
		<img
			src="/{showDetails ? 'collapse.svg' : 'expand_clean.svg'}"
			alt="Unfold"
			class="ml-2 opacity-50"
		/>
	</td>
	{#if !showDetails}
		{#each $allMonths as month}
			{@const total = getTotalForMonth(elements, rows, month.month)}
			<td
				transition:fade={{ duration: 50 }}
				class="{tdClasses} font-mono text-right font-semibold italic"
				>{#if month.month > 0}<StatusArrow
						currentTotal={total}
						previousTotal={getTotalForMonth(elements, rows, month.month - 1)}
						{isIncome}
					/>
				{/if}{total}</td
			>
		{/each}
	{:else}
		{#each $allMonths as _month}
			<td />
		{/each}
	{/if}
</tr>
{#if showDetails}
	{#each rows as row}
		<CategoryRowDisplay {row} {isCopy} />
	{/each}
	<tr class="whitespace-nowrap group bg-blue-100/20" transition:scale={{ duration: 100 }}>
		<td class="{tdClasses} italic"
			>{category.name} totalt {#if !isCopy}<AddCategoryRow {category} />{/if}</td
		>
		{#each $allMonths as month}
			{@const total = getTotalForMonth(elements, rows, month.month)}
			<td class="{tdClasses} bg-blue-100/15 font-mono text-right font-semibold italic"
				>{#if month.month > 0}<StatusArrow
						currentTotal={total}
						previousTotal={getTotalForMonth(elements, rows, month.month - 1)}
						{isIncome}
					/>
				{/if}{total}</td
			>
		{/each}
	</tr>
{/if}
