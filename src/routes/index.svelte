<script lang="ts">
	import CategoryDisplay from '$lib/components/CategoryDisplay.svelte';
	import { exampleData, exampleCategories } from '$lib/exampleData';
	import {
		months,
		type BudgetBasicElement,
		type BudgetCategory,
		type BudgetElement
	} from '$model/StartingModel';

	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	const getAllCategories = (): BudgetCategory[] => {
		return exampleCategories.filter((cat) => cat.isIncome === false);
	};

	const getAllIncomeCategories = (): BudgetCategory[] => {
		return exampleCategories.filter((cat) => cat.isIncome === true);
	};

	const getAllMonths = (): number[] => {
		return exampleData.map((elem) => elem.month).filter(onlyUnique);
	};

	const getAllElementNamesByCategory = (
		elements: BudgetElement[],
		categoryId: number
	): string[] => {
		return elements
			.filter((elem) => elem.categoryId === categoryId)
			.map((elem) => elem.name)
			.filter(onlyUnique);
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
							{#each getAllMonths() as budgetMonth}
								<th class="{thClasses} w-24">{months[budgetMonth]}</th>
							{/each}
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-300">
						{#each getAllCategories() as category}
							<CategoryDisplay
								categoryName={category.name}
								rows={getAllElementNamesByCategory(exampleData, category.id)}
								elements={getAllElementsByCategory(exampleData, category.id)}
							/>
						{/each}
						{#each getAllIncomeCategories() as category}
							<CategoryDisplay
								categoryName={category.name}
								rows={getAllElementNamesByCategory(exampleData, category.id)}
								elements={getAllElementsByCategory(exampleData, category.id)}
								isIncome={true}
							/>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
