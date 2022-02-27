<script lang="ts">
	import { allElements } from '$lib/stores/allElements';
	import { tdClasses } from '$lib/constants/tdClasses';
	import type { BudgetCategoryRows, BudgetElement } from '$model/StartingModel';
	import { loop_guard } from 'svelte/internal';

	export let row: BudgetCategoryRows;
	export let month: number;

	const element = $allElements.find((elem) => elem.rowId === row.id && elem.month === month);

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
			const idx = elements.findIndex((el) => el.rowId === row.id && el.month === month);
			if (idx === -1) {
				// TODO: Create element here
				elements.push({
					categoryId: row.categoryId,
					isOnCredit: false,
					month: month,
					recurring: true,
					rowId: row.id,
					total: new Number(inputValue).valueOf()
				});
			} else {
				elements[idx].total = new Number(inputValue).valueOf();
			}
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
				if (event.key === 'Enter') stopEditing();
			}}
			on:blur={() => stopEditing()}
		/>{:else}<div class="w-14" on:click={() => startEditing()}>
			{getTotal(element)}
		</div>{/if}</td
>
