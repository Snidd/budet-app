<script lang="ts">
	import { addCategoryRow } from '$lib/dal';
	import type { BudgetCategory, BudgetCategoryRow } from '$model';

	import Button from './Button.svelte';
	export let row: BudgetCategoryRow | undefined = undefined;
	export let category: BudgetCategory | undefined = undefined;
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

{#if row}
	<div class="absolute group-hover:visible -mt-7 invisible">
		<Button
			label="+ Ny rad"
			on:click={() => {
				dispatch('add');
				addCategoryRow(row.categoryId, row.index);
			}}
		/>
	</div>
{:else}
	<div class="absolute group-hover:visible -mt-12 invisible">
		<Button
			label="+ Ny rad"
			on:click={() => {
				dispatch('add');
				addCategoryRow(category._id, undefined, false);
			}}
		/>
	</div>
{/if}
