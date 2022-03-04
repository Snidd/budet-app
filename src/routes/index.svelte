<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const categoriesResponse = await fetch('/api/categories');
		const categories = await categoriesResponse.json();

		const categoryRowsResponse = await fetch('/api/rows');
		const categoryRows = await categoryRowsResponse.json();

		const elementsResponse = await fetch('/api/elements');
		const elements = await elementsResponse.json();

		const monthsResponse = await fetch('/api/months/2022');
		const months = (await monthsResponse.json()) as { month: number; year: number }[];

		return {
			status: 200,
			props: {
				categories: categories,
				categoryRows: categoryRows,
				elements: elements,
				months: months.map((month) => month.month)
			}
		};
	};
</script>

<script lang="ts">
	import CategoryDisplay from '$lib/components/CategoryDisplay.svelte';
	import SummaryDisplay from '$lib/components/SummaryDisplay.svelte';
	import { allCategories } from '$lib/stores/allCategories';
	import { sortedCategoryRows } from '$lib/stores/allCategoryRows';
	import { allMonths } from '$lib/stores/allMonths';
	import type { BudgetCategory, BudgetCategoryRow, BudgetElement } from '$model/index';
	import { loadStores } from '$lib/stores/loadStores';
	import { monthNames } from '$lib/constants/monthNames';

	export let categories: BudgetCategory[];
	export let categoryRows: BudgetCategoryRow[];
	export let elements: BudgetElement[];
	export let months: number[];

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

	sortedCategoryRows;

	const thClasses = 'px-6 py-2 text-xs text-gray-500';
</script>

<div class="container flex justify-left ml-16 mt-8">
	<div class="flex flex-col">
		<div class="w-full">
			<div class="border-b border-gray-200 shadow">
				<table class="table-fixed divide-y divide-gray-300">
					<thead class="bg-gray-50">
						<tr>
							<th class="w-48 {thClasses}" />
							{#each $allMonths as budgetMonth}
								<th class="{thClasses} w-24">{monthNames[budgetMonth]}</th>
							{/each}
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-300">
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
			</div>
		</div>
	</div>
</div>
