<script lang="ts">
	import type { BudgetCategory } from '$model';
	import { onDestroy, onMount } from 'svelte';
	import Sortable from 'sortablejs';
	import Icon from '@iconify/svelte';
	import CategoryEditItem from '$lib/components/CategoryEditItem.svelte';
	import Button from '$lib/components/Button.svelte';
	import { addCategory } from '$lib/dal/addCategory';
	import { loadStores } from '$lib/stores/loadStores';
	import { allCategories } from '$lib/stores/allCategories';
	import { updateCategoryIndex } from '$lib/dal/updateCategoryIndex';

	export let categories: BudgetCategory[];

	onMount(() => {
		if ($allCategories && $allCategories.length === 0) {
			loadStores({
				categories: categories
			});
		}
	});

	let list;
	let _sortable: Sortable;

	onMount(() => {
		const options: Sortable.Options = {
			onEnd: (event: Sortable.SortableEvent) => {
				console.log(
					`updating category index: ${event.item.dataset.catid} with index ${event.newIndex + 1}`
				);
				updateCategoryIndex(event.item.dataset.catid, event.newIndex + 1);
			},
			handle: '.cursor-grab'
		};
		_sortable = Sortable.create(list, options);
	});

	onDestroy(() => {
		if (_sortable) {
			_sortable.destroy();
		}
	});
</script>

<ul bind:this={list}>
	{#each $allCategories as category}
		<li
			data-catid={category._id}
			class="w-full rounded-md xl:w-1/2 2xl:w-1/3 p-2 mb-2 flex justify-start items-center bg-slate-200"
		>
			<Icon icon="carbon:draggable" class="cursor-grab hover:opacity-70" />
			<CategoryEditItem {category} />
		</li>
	{/each}
</ul>
<Button label="Add category" on:click={() => addCategory('Ny kategori')} />
