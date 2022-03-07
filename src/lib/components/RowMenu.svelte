<script lang="ts">
	import { updateCategoryRow } from '$lib/dal';
	import { deleteCategoryRow } from '$lib/dal/deleteCategoryRow';
	import type { BudgetCategoryRow } from '$model/BudgetCategoryRow';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let row: BudgetCategoryRow;

	const allClasses = 'cursor-pointer w-6 h-6 rounded-md';
	const activeClasses = 'bg-blue-200 hover:bg-blue-300';
	const inactiveClasses = 'opacity-60 hover:bg-gray-300';
	const marginWidth = 'ml-2';

	const toggleOnCredit = () => {
		updateCategoryRow({ ...row, isOnCredit: !row.isOnCredit });
	};

	const toggleRecurring = () => {
		updateCategoryRow({ ...row, recurring: !row.recurring });
	};
</script>

<!-- //on:click|stopPropagation={() => toggleEditName(row)} -->
<button
	class="{$$props.class} -ml-1"
	on:click={() => {
		dispatch('edit');
		dispatch('cancel');
	}}
>
	<Icon icon="carbon:edit" class="{allClasses} cursor-pointer hover:opacity-60" />
</button>

<button on:click={() => toggleOnCredit()} class={marginWidth}>
	<Icon
		icon="ant-design:credit-card-filled"
		class="{allClasses} {$$props.class} {row.isOnCredit ? activeClasses : inactiveClasses}"
	/>
</button>

<button on:click={() => toggleRecurring()} class={marginWidth}>
	<Icon
		icon="carbon:repeat"
		class="{allClasses} {$$props.class} {row.recurring ? activeClasses : inactiveClasses}"
	/></button
>

<button
	on:click={() => {
		dispatch('cancel');
		deleteCategoryRow(row._id);
	}}
	class="{marginWidth} grow"
>
	<Icon icon="carbon:delete" class="{allClasses} {$$props.class} {inactiveClasses}" /></button
>

<button on:click={() => dispatch('cancel')}>
	<Icon
		icon="carbon:close"
		class="cursor-pointer w-6 h-6 rounded-md {inactiveClasses} {$$props.class}"
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
