<script lang="ts">
	import CategoryDisplay from '$lib/components/CategoryDisplay.svelte';
	import SummaryDisplay from '$lib/components/SummaryDisplay.svelte';
	import { allCategories, allIncomeCategories, allNormalCategories } from '$lib/stores';
	import { sortedCategoryRows, rowsByCategory } from '$lib/stores';
	import { allMonths } from '$lib/stores/allMonths';
	import type { BudgetCategory, BudgetCategoryRow, BudgetElement } from '$model/index';
	import { loadStores } from '$lib/stores/loadStores';
	import { monthNames } from '$lib/constants/monthNames';
	import type { BudgetMonth } from '$model/BudgetMonth';

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
		{#each $allNormalCategories as category}
			<CategoryDisplay {category} isCopy={category.containsCreditCopies} />
		{/each}
		{#each $allIncomeCategories as category}
			<CategoryDisplay {category} isIncome={true} />
		{/each}
		<SummaryDisplay />
	</tbody>
</table>
