<script lang="ts">
	import { updateCategoryRow } from '$lib/dal';

	import type { BudgetCategoryRow } from '$model/BudgetCategoryRow';

	export let row: BudgetCategoryRow;

	const activeClasses =
		'bg-blue-200 w-6 h-6 border-2 mb-2 border-blue-300 rounded-md hover:bg-blue-300 hover:border-blue-400';
	const inactiveClasses = 'w-6 h-6 opacity-60 rounded-md hover:border-gray-400 hover:bg-gray-300';

	const toggleOnCredit = () => {
		updateCategoryRow({ ...row, isOnCredit: !row.isOnCredit });
	};

	const toggleRecurring = () => {
		updateCategoryRow({ ...row, recurring: !row.recurring });
	};
</script>

<input
	class="invisible group-hover:visible {row.isOnCredit ? activeClasses : inactiveClasses}"
	on:click={() => toggleOnCredit()}
	type="image"
	src="/credit_card.svg"
	alt="On Credit"
/>
<input
	class="p-1 invisible group-hover:visible {row.recurring ? activeClasses : inactiveClasses}"
	on:click={() => toggleRecurring()}
	type="image"
	src="/repeat.svg"
	alt="Recurring"
/>

<style>
	.menuDiv {
		margin-left: -76px;
		border-left: 1px solid rgb(209 213 219);
		border-top: 1px solid rgb(209 213 219);
		border-bottom: 1px solid rgb(209 213 219);
	}
</style>
