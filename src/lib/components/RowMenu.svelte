<script lang="ts">
	import { updateCategoryRow } from '$lib/dal';
	import Icon from '@iconify/svelte';

	import type { BudgetCategoryRow } from '$model/BudgetCategoryRow';

	export let row: BudgetCategoryRow;

	const allClasses = 'cursor-pointer invisible group-hover:visible ml-2 w-6 h-6 rounded-md';
	const activeClasses = 'bg-blue-200 hover:bg-blue-300';
	const inactiveClasses = 'opacity-60 hover:bg-gray-300';

	const toggleOnCredit = () => {
		updateCategoryRow({ ...row, isOnCredit: !row.isOnCredit });
	};

	const toggleRecurring = () => {
		updateCategoryRow({ ...row, recurring: !row.recurring });
	};
</script>

<button on:click={() => toggleOnCredit()}>
	<Icon
		icon="ant-design:credit-card-filled"
		class="{allClasses} {row.isOnCredit ? activeClasses : inactiveClasses}"
	/>
</button>

<button on:click={() => toggleRecurring()}>
	<Icon
		icon="carbon:repeat"
		class="{allClasses} {row.recurring ? activeClasses : inactiveClasses}"
	/></button
>

<style>
	.menuDiv {
		margin-left: -76px;
		border-left: 1px solid rgb(209 213 219);
		border-top: 1px solid rgb(209 213 219);
		border-bottom: 1px solid rgb(209 213 219);
	}
</style>
