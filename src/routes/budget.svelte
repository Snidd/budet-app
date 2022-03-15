<script lang="ts">
	import CategoryDisplay from '$lib/components/CategoryDisplay.svelte';
	import SummaryDisplay from '$lib/components/SummaryDisplay.svelte';
	import { allCategories } from '$lib/stores/allCategories';
	import { sortedCategoryRows } from '$lib/stores/allCategoryRows';
	import { allMonths } from '$lib/stores/allMonths';
	import type { BudgetCategory, BudgetCategoryRow, BudgetElement } from '$model/index';
	import { loadStores } from '$lib/stores/loadStores';
	import { monthNames } from '$lib/constants/monthNames';
	import type { BudgetMonth } from '$model/BudgetMonth';
	import { onDestroy } from 'svelte';

	export let categories: BudgetCategory[];
	export let categoryRows: BudgetCategoryRow[];
	export let elements: BudgetElement[];
	export let months: BudgetMonth[];

	loadStores({
		categories: categories,
		categoryRows: categoryRows,
		elements: elements,
		months: months
	});

	const getAllCategories = (categories: BudgetCategory[]): BudgetCategory[] => {
		return categories.filter((cat) => cat.isIncome === false);
	};

	const getAllIncomeCategories = (categories: BudgetCategory[]): BudgetCategory[] => {
		return categories.filter((cat) => cat.isIncome === true);
	};

	const getRowsByCategory = (
		rows: BudgetCategoryRow[],
		category: BudgetCategory
	): BudgetCategoryRow[] => {
		let additionalRows: BudgetCategoryRow[] = [];
		if (category.containsCreditCopies) {
			additionalRows = rows.filter((row) => row.isOnCredit);
		}
		const rowsByCategory = rows.filter((row) => row.categoryId === category._id);
		return additionalRows.concat(rowsByCategory);
	};

	onDestroy(() => {
		console.log('Destroy budget!');
	});

	const thClasses = 'px-6 py-2 text-xs text-gray-500';
</script>

<table class="table-fixed border-collapse border border-gray-300">
	<thead class="bg-gray-50">
		<tr class="border border-gray-300">
			<th class="w-48 {thClasses}" />
			{#each $allMonths as budgetMonth}
				<th class="{thClasses} w-24">{monthNames[budgetMonth.month]}</th>
			{/each}
		</tr>
	</thead>
	<tbody class="bg-white">
		{#each getAllCategories($allCategories) as category}
			<CategoryDisplay
				{category}
				rows={getRowsByCategory($sortedCategoryRows, category)}
				isCopy={category.containsCreditCopies}
			/>
		{/each}
		{#each getAllIncomeCategories($allCategories) as category}
			<CategoryDisplay
				{category}
				rows={getRowsByCategory($sortedCategoryRows, category)}
				isIncome={true}
			/>
		{/each}
		<SummaryDisplay />
	</tbody>
</table>
