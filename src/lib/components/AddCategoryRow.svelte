<script lang="ts">
	import { addCategoryRow } from '$lib/dal';
	import { allCategoryRows } from '$lib/stores/allCategoryRows';
	import type { BudgetCategory, BudgetCategoryRow } from '$model';

	import Button from './Button.svelte';
	export let row: BudgetCategoryRow | undefined = undefined;
	export let category: BudgetCategory | undefined = undefined;

	const getLastRowId = (categoryRows: BudgetCategoryRow[], categoryId: number): number => {
		const lastRow = categoryRows.filter((row) => row.categoryId === categoryId).pop();
		return lastRow.id;
	};
</script>

{#if row}
	<div class="absolute group-hover:visible -mt-7 invisible">
		<Button label="+ Ny rad" on:click={() => addCategoryRow(row.categoryId, row.id)} />
	</div>
{:else}
	<div class="absolute group-hover:visible -mt-12 invisible">
		<Button
			label="+ Ny rad"
			on:click={() =>
				addCategoryRow(category.id, getLastRowId($allCategoryRows, category.id), false)}
		/>
	</div>
{/if}
