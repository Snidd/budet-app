<script lang="ts">
	import { exampleData } from '$lib/exampleData';
	import { months, type BudgetBasicElement } from '$model/StartingModel';

	const getTotalForElements = (elements: BudgetBasicElement[]): number => {
		return elements.reduce((prev, cur) => {
			return prev + cur.total;
		}, 0);
	};
</script>

<div class="m-16 flex gap-2">
	{#each exampleData as budgetMonth}
		<div class="flex flex-col">
			<p class="text-blue-900 pl-1 font-bold">{months[budgetMonth.month]}</p>
			{#each budgetMonth.categories as categories}
				<div class="mt-4">
					<p class="font-bold pl-1">{categories.name}</p>
					{#each categories.elements as elements}
						<div class="flex">
							<div class="w-48 overflow-hidden text-ellipsis border-2 border-b-0 p-1">
								{elements.description}
							</div>
							<div class="font-mono w-16 p-1 border-2 border-l-0 pl-2 border-b-0">
								{elements.total}
							</div>
						</div>
					{/each}
					<div class="flex">
						<div class="w-48 italic border-2 p-1">Total</div>
						<div class="font-mono w-16 font-bold border-2 border-l-0 p-1 pl-2">
							{getTotalForElements(categories.elements)}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>
