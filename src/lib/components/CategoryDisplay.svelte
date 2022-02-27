<script lang="ts">
	import type {
		BudgetBasicElement,
		BudgetCategoryRows,
		BudgetTableElement
	} from '$model/StartingModel';
	import StatusArrow from './StatusArrow.svelte';
	import { fade, scale } from 'svelte/transition';
	import { allMonths } from '$lib/stores/allMonths';
	import { tdClasses } from '$lib/constants/tdClasses';
	import ElementCell from './ElementCell.svelte';
	import { getTotalForMonth } from '$lib/calculations/getTotalForMonth';
	import { allCategories } from '$lib/stores/allCategories';
	import { selectedRow } from '$lib/stores/selectedRow';
	import RowMenu from './RowMenu.svelte';
	export let categoryName: string;
	export let rows: BudgetCategoryRows[];
	export let elements: BudgetBasicElement[];
	export let isIncome = false;

	let showDetails = false;
</script>

<tr
	class="whitespace-nowrap cursor-pointer hover:bg-slate-200"
	on:click={() => (showDetails = !showDetails)}
>
	<td class="font-bold {tdClasses} flex"
		><div>{categoryName}</div>
		<img
			src="/{showDetails ? 'collapse.svg' : 'expand_clean.svg'}"
			alt="Unfold"
			class="ml-2 opacity-50"
		/>
	</td>
	{#if !showDetails}
		{#each $allMonths as month}
			{@const total = getTotalForMonth(elements, month)}
			<td
				transition:fade={{ duration: 50 }}
				class="{tdClasses} font-mono text-right font-semibold italic"
				>{#if month > 0}<StatusArrow
						currentTotal={total}
						previousTotal={getTotalForMonth(elements, month - 1)}
						{isIncome}
					/>
				{/if}{total}</td
			>
		{/each}
	{:else}
		{#each $allMonths as month}
			<td />
		{/each}
	{/if}
</tr>
{#if showDetails}
	{#each rows as row}
		{@const rowSelected = $selectedRow && $selectedRow.id === row.id}
		<tr
			on:click={() => selectedRow.set(row)}
			class="whitespace-nowrap {rowSelected ? 'bg-gray-100' : ''}"
			transition:scale={{ duration: 100 }}
		>
			<td class={tdClasses}
				>{#if rowSelected}<RowMenu {row} />{/if}
				{row.name}</td
			>
			{#each $allMonths as month}
				<ElementCell {row} {month} />
			{/each}
		</tr>
	{/each}
	<tr class="whitespace-nowrap bg-blue-100/20" transition:scale={{ duration: 100 }}>
		<td class="{tdClasses} italic">{categoryName} totalt</td>
		{#each $allMonths as month}
			{@const total = getTotalForMonth(elements, month)}
			<td class="{tdClasses} bg-blue-100/15 font-mono text-right font-semibold italic"
				>{#if month > 0}<StatusArrow
						currentTotal={total}
						previousTotal={getTotalForMonth(elements, month - 1)}
						{isIncome}
					/>
				{/if}{total}</td
			>
		{/each}
	</tr>
{/if}
