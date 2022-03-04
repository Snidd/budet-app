<script lang="ts">
	import { getTotalWithIncomesForMonth } from '$lib/calculations/getTotalForMonth';
	import { tdClasses } from '$lib/constants/tdClasses';
	import { allCategories } from '$lib/stores/allCategories';
	import { allElements } from '$lib/stores/allElements';
	import { allMonths } from '$lib/stores/allMonths';
	import StatusArrow from './StatusArrow.svelte';
</script>

<tr class="whitespace-nowrap bg-blue-100/20">
	<td class="{tdClasses} italic">Kvar att slösa</td>
	{#each $allMonths as month}
		{@const total = -getTotalWithIncomesForMonth($allElements, $allCategories, month.month)}
		<td class="{tdClasses} bg-blue-100/15 font-mono text-right font-semibold italic"
			>{#if month.month > 0}<StatusArrow
					currentTotal={total}
					previousTotal={-getTotalWithIncomesForMonth(
						$allElements,
						$allCategories,
						month.month - 1
					)}
					isIncome={true}
				/>
			{/if}
			{total}</td
		>
	{/each}
</tr>
