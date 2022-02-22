<script lang="ts">
	import CategoryDisplay from '$lib/components/CategoryDisplay.svelte';
	import { exampleData } from '$lib/exampleData';
	import {
		months,
		type BudgetBasicElement,
		type BudgetCategory,
		type BudgetMonth,
		type BudgetTableElement
	} from '$model/StartingModel';

	const getTotalForElements = (elements: BudgetBasicElement[]): number => {
		return elements.reduce((prev, cur) => {
			return prev + cur.total;
		}, 0);
	};

	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	const getAllCategoryNames = (months: BudgetMonth[]): string[] => {
		return months
			.map((month) => month.categories)
			.flat()
			.map((cat) => cat.name)
			.flat()
			.filter(onlyUnique);
	};

	const getAllElementNamesByCategory = (months: BudgetMonth[], categoryName: string): string[] => {
		const categoryNames = months
			.map((month) => month.categories)
			.flat()
			.filter((cat) => cat.name === categoryName)
			.map((bc) => bc.elements.map((elem) => elem.description))
			.flat()
			.filter(onlyUnique);

		return categoryNames;
	};

	const getAllElementsByCategoryName = (
		months: BudgetMonth[],
		categoryName: string
	): BudgetBasicElement[] => {
		const elements = months
			.map((month) => month.categories)
			.flat()
			.filter((bc) => bc.name === categoryName)
			.map((bc) => bc.elements)
			.flat();
		return elements;
	};

	const thClasses = 'px-6 py-2 text-xs text-gray-500';
	const tdClasses = 'px-6 py-4 text-sm text-gray-500';
</script>

<div class="container flex justify-left mx-auto mt-8">
	<div class="flex flex-col">
		<div class="w-full">
			<div class="border-b border-gray-200 shadow">
				<table class="table-fixed divide-y divide-gray-300">
					<thead class="bg-gray-50">
						<tr>
							<th class="w-48 {thClasses}" />
							{#each exampleData as budgetMonth}
								<th class="{thClasses} w-24">{months[budgetMonth.month]}</th>
							{/each}
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-300">
						{#each getAllCategoryNames(exampleData) as categoryName}
							<CategoryDisplay
								{categoryName}
								rows={getAllElementNamesByCategory(exampleData, categoryName)}
								elements={getAllElementsByCategoryName(exampleData, categoryName)}
							/>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
