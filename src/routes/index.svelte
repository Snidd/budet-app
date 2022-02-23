<script lang="ts">
	import CategoryDisplay from '$lib/components/CategoryDisplay.svelte';
	import SummaryDisplay from '$lib/components/SummaryDisplay.svelte';
	import { allCategories } from '$lib/stores/allCategories';
	import { allCategoryRows } from '$lib/stores/allCategoryRows';
	import { allElements, loadExampleData } from '$lib/stores/allElements';
	import { allMonths } from '$lib/stores/allMonths';
	import {
		months,
		type BudgetBasicElement,
		type BudgetCategory,
		type BudgetCategoryRows,
		type BudgetElement
	} from '$model/StartingModel';

	loadExampleData();

	const getAllCategories = (categories: BudgetCategory[]): BudgetCategory[] => {
		return categories.filter((cat) => cat.isIncome === false);
	};

	const getAllIncomeCategories = (categories: BudgetCategory[]): BudgetCategory[] => {
		return categories.filter((cat) => cat.isIncome === true);
	};

	const getRowsByCategory = (
		rows: BudgetCategoryRows[],
		categoryId: number
	): BudgetCategoryRows[] => {
		return rows.filter((row) => row.categoryId === categoryId);
	};

	const getAllElementsByCategory = (
		elements: BudgetElement[],
		categoryId: number
	): BudgetBasicElement[] => {
		return elements.filter((elem) => elem.categoryId === categoryId);
	};

	const thClasses = 'px-6 py-2 text-xs text-gray-500';
</script>

<div class="container flex justify-left mx-auto mt-8">
	<div class="flex flex-col">
		<div class="w-full">
			<div class="border-b border-gray-200 shadow">
				<table class="table-fixed divide-y divide-gray-300">
					<thead class="bg-gray-50">
						<tr>
							<th class="w-48 {thClasses}" />
							{#each $allMonths as budgetMonth}
								<th class="{thClasses} w-24">{months[budgetMonth]}</th>
							{/each}
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-300">
						{#each getAllCategories($allCategories) as category}
							<CategoryDisplay
								categoryName={category.name}
								rows={getRowsByCategory($allCategoryRows, category.id)}
								elements={getAllElementsByCategory($allElements, category.id)}
							/>
						{/each}
						{#each getAllIncomeCategories($allCategories) as category}
							<CategoryDisplay
								categoryName={category.name}
								rows={getRowsByCategory($allCategoryRows, category.id)}
								elements={getAllElementsByCategory($allElements, category.id)}
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
