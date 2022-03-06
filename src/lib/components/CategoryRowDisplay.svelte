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
	import { currentDragTarget } from '$lib/stores/currentDragTarget';
	import { updateRowIndex } from '$lib/dal/updateRowIndex';

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

	$: showDragBorder = $currentDragTarget === row._id;

	const handleDragStart = (e: DragEvent & { currentTarget: EventTarget & HTMLTableRowElement }) => {
		e.dataTransfer.dropEffect = 'move';
		e.dataTransfer.setData('_id', row._id);
		e.dataTransfer.setData('categoryId', row.categoryId);
		e.dataTransfer.setDragImage(thisRow, 5, 30);
		isDragging = true;
	};

	const handleDragEnter = (e: DragEvent & { currentTarget: EventTarget & HTMLTableRowElement }) => {
		currentDragTarget.set(row._id);
	};

	let thisRow: HTMLTableRowElement;

	const handleDragDrop = (e: DragEvent & { currentTarget: EventTarget & HTMLTableRowElement }) => {
		e.preventDefault();
		var startRowId = e.dataTransfer.getData('_id');
		console.log(`updating rowIndex: ${startRowId} ${row.index}`);
		updateRowIndex(startRowId, row.index + 1);
		currentDragTarget.set(null);
		isDragging = false;
	};

	const handleDragOver = (e: DragEvent & { currentTarget: EventTarget & HTMLTableRowElement }) => {
		if (e.dataTransfer.getData('categoryId') === row.categoryId) {
			e.preventDefault();
		}
	};

	const handleDragEnd = () => {
		isDragging = false;
	};
</script>

<tr
	class="whitespace-nowrap border {showDragBorder ? 'border-blue-600' : 'border-slate-300'} {isCopy
		? 'bg-orange-100'
		: ''} {row.isIncome ? 'bg-green-100' : ''} group {rowSelected ? 'bg-gray-100' : ''}"
	transition:scale={{ duration: 100 }}
	on:dragstart={handleDragStart}
	on:dragenter={handleDragEnter}
	on:drop={handleDragDrop}
	on:dragend={handleDragEnd}
	on:dragover={handleDragOver}
	bind:this={thisRow}
>
	<td class={tdClasses}>
		{#if !isCopy && !isDragging}
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
