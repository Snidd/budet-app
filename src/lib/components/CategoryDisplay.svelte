<script lang="ts">
	import type { BudgetBasicElement, BudgetTableElement } from '$model/StartingModel';
	import StatusArrow from './StatusArrow.svelte';
	import { fade, scale } from 'svelte/transition';

	export let categoryName: string;
	export let rows: string[];
	export let elements: BudgetBasicElement[];
	export let isIncome = false;

	let showDetails = true;

	const tdClasses = 'px-6 py-4 text-sm text-gray-500';

	const getAllElementsByRow = (
		rowName: string,
		elements: BudgetBasicElement[]
	): BudgetTableElement[] => {
		const elementsMonths = getMonths(elements).map<BudgetTableElement>((month) => {
			const curElem = elements.find((elem) => elem.month === month && elem.name === rowName);
			if (curElem === undefined) {
				return { total: 0, description: '', month: month, show: false, categoryId: -1, name: '' };
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

<tr
	class="whitespace-nowrap cursor-pointer hover:bg-slate-100"
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
		{#each getMonths(elements) as month}
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
		{#each getMonths(elements) as month}
			<td />
		{/each}
	{/if}
</tr>
{#if showDetails}
	{#each rows as elementName}
		<tr class="whitespace-nowrap" transition:scale={{ duration: 100 }}>
			<td class={tdClasses}>{elementName}</td>
			{#each getAllElementsByRow(elementName, elements) as element}
				<td class="font-mono text-right {tdClasses}">{element.show ? element.total : ''}</td>
			{/each}
		</tr>
	{/each}
	<tr class="whitespace-nowrap bg-blue-100/20" transition:scale={{ duration: 100 }}>
		<td class="{tdClasses} italic">Total</td>
		{#each getMonths(elements) as month}
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
