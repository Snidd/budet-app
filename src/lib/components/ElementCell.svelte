<script lang="ts">
	import { allElements } from '$lib/stores';
	import { tdClasses } from '$lib/constants/tdClasses';
	import type { BudgetCategoryRow, BudgetElement } from '$model/index';
	import { onMount } from 'svelte';
	import type { BudgetMonth } from '$model/BudgetMonth';
	import { updateElement } from '$lib/dal/updateElement';

	export let row: BudgetCategoryRow;
	export let month: BudgetMonth;

	$: element = $allElements.find((elem) => elem.rowId === row._id && elem.month === month.month);

	let isEditing = false;

	const getTotal = (elem: BudgetElement | undefined): number => {
		if (elem) {
			return elem.total;
		} else {
			return 0;
		}
	};

	let inputValue = -1;
	let originalValue = -1;

	$: setInputValue(row._id);
	const setInputValue = (_id: string) => {
		inputValue = getTotal(element);
	};

	onMount(() => {
		inputValue = getTotal(element);
		originalValue = getTotal(element);
	});

	const startEditing = () => {
		isEditing = true;
		return;
	};

	const cancelEditing = () => {
		isEditing = false;
		inputValue = originalValue;
	};

	const stopEditing = () => {
		isEditing = false;
		updateElement(new Number(inputValue).valueOf(), row._id, month.month);
		return;
	};
</script>

{#key row._id}
	<td class="font-mono text-right {tdClasses}"
		>{#if isEditing}
			<!-- svelte-ignore a11y-autofocus -->
			<input
				type="text"
				class="w-full text-right outline-2 outline-dotted"
				bind:value={inputValue}
				autofocus={true}
				on:keypress={(event) => {
					if (event.key === 'Enter') stopEditing();
				}}
				on:keyup={(event) => {
					if (event.key === 'Escape') {
						cancelEditing();
						return;
					}
				}}
				on:blur={() => stopEditing()}
			/>{:else}<div class="w-full" on:click={() => startEditing()}>
				{getTotal(element)}
			</div>{/if}</td
	>
{/key}
