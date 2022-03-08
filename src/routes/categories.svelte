<script lang="ts">
	import type { BudgetCategory } from '$model';
	import { onMount } from 'svelte';
	import { Sortable } from 'sortablejs';
	import Icon from '@iconify/svelte';
	import CategoryEditItem from '$lib/components/CategoryEditItem.svelte';

	export let categories: BudgetCategory[];

	let test: Sortable.Options;

	let list;

	onMount(() => {
		const options: Sortable.Options = {
			onEnd: (event: Sortable.SortableEvent) => {
				console.log(`new index: ${event.newIndex}`);
				console.log(`catId: ${event.item.dataset.catid}`);
			},
			handle: '.cursor-grab'
		};
		const _sortable: Sortable = Sortable.create(list, options);
	});
</script>

<ul bind:this={list}>
	{#each categories as category}
		<li
			data-catid={category._id}
			class="w-full xl:w-1/2 2xl:w-1/3 p-2 mb-2 flex justify-start items-center bg-slate-300"
		>
			<Icon icon="carbon:draggable" class="cursor-grab hover:opacity-70" />
			<CategoryEditItem {category} />
		</li>
	{/each}
</ul>
