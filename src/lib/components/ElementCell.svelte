<script lang="ts">
	import { allElements } from '$lib/stores/allElements';
	import { tdClasses } from '$lib/constants/tdClasses';
	import type { BudgetElement } from '$model/StartingModel';

	export let rowId: number;
	export let month: number;

	const element = $allElements.find((elem) => elem.rowId === rowId && elem.month === month);

	let isEditing = false;

	const getTotal = (elem: BudgetElement | undefined): number => {
		if (elem) {
			return elem.total;
		} else {
			return 0;
		}
	};

	let inputField: HTMLInputElement;

	let inputValue = getTotal(element);

	const toggleEditing = () => {
		isEditing = !isEditing;
		if (inputField) {
			inputField.focus();
		}
		return;
	};
</script>

<td class="font-mono text-right {tdClasses}"
	>{#if isEditing}<input
			bind:this={inputField}
			type="text"
			class="w-14 text-right outline-2 outline-dotted pr-2"
			bind:value={inputValue}
		/>{:else}<span class="pr-2" on:click={() => toggleEditing()}>{getTotal(element)}</span>{/if}</td
>
