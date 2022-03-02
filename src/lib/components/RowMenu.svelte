<script lang="ts">
	import { updateCategoryRow } from '$lib/dal';

	import type { BudgetCategoryRow } from '$model/BudgetCategoryRow';

	export let row: BudgetCategoryRow;

	const activeClasses =
		'bg-blue-200 w-8 h-8 border-2 mb-2 border-blue-300 rounded-md hover:bg-blue-300 hover:border-blue-400';
	const inactiveClasses =
		'bg-gray-200 w-8 h-8 border-2 mb-2 border-gray-300 rounded-md hover:border-gray-400 hover:bg-gray-300';

	const toggleOnCredit = () => {
		updateCategoryRow({ ...row, isOnCredit: !row.isOnCredit });
	};

	const toggleRecurring = () => {
		updateCategoryRow({ ...row, recurring: !row.recurring });
	};
</script>

<div
	class="menuDiv absolute flex flex-col -mt-10 bg-gray-100 rounded-l-md  drop-shadow-sm border-gray-300 p-2"
>
	<input
		class={row.isOnCredit ? activeClasses : inactiveClasses}
		on:click={() => toggleOnCredit()}
		type="image"
		src="/credit_card.svg"
		alt="On Credit"
	/>
	<input
		class="p-1 {row.recurring ? activeClasses : inactiveClasses}"
		on:click={() => toggleRecurring()}
		type="image"
		src="/repeat.svg"
		alt="Recurring"
	/>
</div>

<style>
	.menuDiv {
		margin-left: -76px;
		border-left: 1px solid rgb(209 213 219);
		border-top: 1px solid rgb(209 213 219);
		border-bottom: 1px solid rgb(209 213 219);
	}
</style>
