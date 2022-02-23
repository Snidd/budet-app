<script lang="ts">
	import { allElements } from '$lib/stores/allElements';
	import { tdClasses } from '$lib/constants/tdClasses';
	import type { BudgetElement } from '$model/StartingModel';
	import { loop_guard } from 'svelte/internal';

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

	let inputValue = getTotal(element);

	const startEditing = () => {
		isEditing = true;
		return;
	};

	const stopEditing = () => {
		isEditing = false;
		allElements.update((elements) => {
			const idx = elements.findIndex((el) => el.rowId === rowId && el.month === month);
			elements[idx].total = new Number(inputValue).valueOf();
			return elements;
		});
		return;
	};
</script>

<td class="font-mono text-right {tdClasses}"
	>{#if isEditing}
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="text"
			class="w-14 text-right outline-2 outline-dotted pr-2"
			bind:value={inputValue}
			autofocus={true}
			on:keypress={(event) => {
				console.log(event.key);
				if (event.key === 'Enter') stopEditing();
			}}
			on:blur={() => stopEditing()}
		/>{:else}<div class="w-14" on:click={() => startEditing()}>
			{getTotal(element)}
		</div>{/if}</td
>
