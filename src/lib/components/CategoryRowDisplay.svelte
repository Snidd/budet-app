<script lang="ts">
	import { tdClasses } from '$lib/constants/tdClasses';
	import { updateCategoryRow } from '$lib/dal';
	import Icon from '@iconify/svelte';
	import { allMonths } from '$lib/stores/allMonths';
	import { selectedRow } from '$lib/stores/selectedRow';
	import type { BudgetCategoryRow } from '$model';
	import { tick } from 'svelte';
	import { scale } from 'svelte/transition';
	import AddCategoryRow from './AddCategoryRow.svelte';
	import ElementCell from './ElementCell.svelte';
	import RowMenu from './RowMenu.svelte';
	import DragRowElement from './DragRowElement.svelte';

	export let row: BudgetCategoryRow;
	export let isCopy = false;

	const toggleSelectRow = async (
		row: BudgetCategoryRow,
		isSelected: boolean | null,
		value: boolean
	) => {
		if (isSelected && !value) {
			selectedRow.set(null);
			await tick();
		}
		if (!isSelected && value) {
			selectedRow.set(row);
			await tick();
		}
	};

	let rowSelected: boolean = false;

	const isSelected = (selRow: BudgetCategoryRow, id: string): boolean => {
		if (isCopy) return false;
		return selRow && selRow._id === id;
	};

	$: rowSelected = isSelected($selectedRow, row._id);

	let isEditingRow: string | null = null;

	let inputValue = row.name;

	let showDragBorder = false;
	let isDragging = false;

	const toggleEditName = async (row: BudgetCategoryRow, done = false) => {
		if (done) {
			updateCategoryRow({ ...row, name: inputValue });
			isEditingRow = null;
			return;
		}
		isEditingRow = row._id;
	};

	const handleDragStart = (e: DragEvent & { currentTarget: EventTarget & HTMLTableRowElement }) => {
		e.dataTransfer.dropEffect = 'move';
		e.dataTransfer.setData('_id', row._id);
		e.dataTransfer.setData('name', row.name);
		e.dataTransfer.setData('categoryId', row.categoryId);
		showDragBorder = true;
		isDragging = true;
	};

	const handleDragEnter = (e: DragEvent & { currentTarget: EventTarget & HTMLTableRowElement }) => {
		showDragBorder = true;
	};

	const handleDragLeave = () => {
		showDragBorder = false;
	};

	const handleDragDrop = (e: DragEvent & { currentTarget: EventTarget & HTMLTableRowElement }) => {
		e.preventDefault();
		var startRow = e.dataTransfer.getData('_id');
		var rowName = e.dataTransfer.getData('name');
		console.log(`${rowName} ${startRow}`);
		showDragBorder = false;
		isDragging = false;
	};

	const handleDragEnd = () => {
		isDragging = false;
	};

	const handleDragOver = (e: DragEvent & { currentTarget: EventTarget & HTMLTableRowElement }) => {
		if (e.dataTransfer.getData('categoryId') === row.categoryId) {
			e.preventDefault();
		}
	};
</script>

<tr
	class="whitespace-nowrap border {showDragBorder ? 'border-blue-600' : 'border-slate-300'} {isCopy
		? 'bg-orange-100'
		: ''} {row.isIncome ? 'bg-green-100' : ''} group {rowSelected ? 'bg-gray-100' : ''}"
	transition:scale={{ duration: 100 }}
	draggable="true"
	on:dragstart={handleDragStart}
	on:dragenter={handleDragEnter}
	on:dragleave={handleDragLeave}
	on:drop={handleDragDrop}
	on:dragover={handleDragOver}
	on:dragend={handleDragEnd}
>
	<td class={tdClasses}>
		{#if !isCopy}
			<AddCategoryRow {row} />
		{/if}
		<div class="flex justify-start items-center">
			<DragRowElement />
			{#if isEditingRow === row._id}
				<!-- svelte-ignore a11y-autofocus -->
				<input
					autofocus={true}
					bind:value={inputValue}
					on:blur={() => toggleEditName(row, true)}
					on:keypress={(event) => {
						if (event.key === 'Enter') toggleEditName(row, true);
					}}
					class="w-full text-left outline-2 outline-dotted pr-2"
					type="text"
				/>
			{:else}
				<p class="text-center h-full">{row.name}</p>
				{#if !isDragging}
					<button
						class="group-hover:visible invisible"
						on:click|stopPropagation={() => toggleEditName(row)}
					>
						<Icon icon="carbon:edit" class="ml-3 mt-1 h-6 w-6 cursor-pointer hover:opacity-60" />
					</button>
				{/if}
			{/if}
			{#if !isCopy && !isDragging}
				<RowMenu {row} />
			{/if}
		</div>
	</td>
	{#each $allMonths as month}
		<ElementCell {row} {month} />
	{/each}
</tr>
