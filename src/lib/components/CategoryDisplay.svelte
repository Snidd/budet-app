<script lang="ts">
	import type { BudgetBasicElement, BudgetTableElement } from '$model/StartingModel';
	import { element } from 'svelte/internal';

	export let categoryName: string;
	export let rows: string[];
	export let elements: BudgetBasicElement[];

	const tdClasses = 'px-6 py-4 text-sm text-gray-500';

	const getAllElementsByRow = (
		rowName: string,
		elements: BudgetBasicElement[]
	): BudgetTableElement[] => {
		const elementsMonths = getMonths(elements).map<BudgetTableElement>((month) => {
			const curElem = elements.find((elem) => elem.month === month && elem.description === rowName);
			if (curElem === undefined) {
				return { total: 0, description: '', month: month, show: false };
			}
			return { ...curElem, show: true };
		});
		return elementsMonths;
	};

	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	const getTotalForMonth = (elements: BudgetBasicElement[], month: number): number => {
		return elements.reduce((prev, cur) => {
			if (cur.month === month) {
				return prev + cur.total;
			}
			return prev;
		}, 0);
	};

	const getMonths = (elements: BudgetBasicElement[]): number[] => {
		return elements
			.map((elem) => elem.month)
			.filter(onlyUnique)
			.sort((a, b) => a - b);
	};
</script>

<tr class="whitespace-nowrap">
	<td colspan="2" class="font-bold {tdClasses}">{categoryName}</td>
</tr>
{#each rows as elementName}
	<tr class="whitespace-nowrap">
		<td class={tdClasses}>{elementName}</td>
		{#each getAllElementsByRow(elementName, elements) as element}
			<td class="font-mono text-right {tdClasses}">{element.show ? element.total : ''}</td>
		{/each}
	</tr>
{/each}
<tr class="whitespace-nowrap bg-gray-100">
	<td class="{tdClasses} italic">Total</td>
	{#each getMonths(elements) as month}
		{@const total = getTotalForMonth(elements, month)}
		<td class="{tdClasses} bg-gray-100 font-mono text-right font-semibold italic"
			>{#if month > 0 && total > getTotalForMonth(elements, month - 1)}
				<span class="ml-1 text-red-500">↑</span>
			{/if}{total}</td
		>
	{/each}
</tr>
