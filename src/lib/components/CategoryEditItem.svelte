<script lang="ts">
	import { deleteCategory } from '$lib/dal/deleteCategory';

	import { updateCategory } from '$lib/dal/updateCategory';

	import type { BudgetCategory } from '$model';
	import Icon from '@iconify/svelte';
	export let category: BudgetCategory;

	let isEditing = false;

	let inputValue: string;
	let originalValue: string;

	$: setInputValue(category._id);
	const setInputValue = (_id: string) => {
		inputValue = category.name;
		originalValue = category.name;
	};

	const stopEditing = () => {
		isEditing = false;
		if (inputValue !== originalValue) {
			updateCategory(category._id, { name: inputValue });
			originalValue = inputValue;
		}
	};

	const cancelEditing = () => {
		isEditing = false;
		inputValue = originalValue;
	};

	const allClasses = 'cursor-pointer w-6 h-6 rounded-md';
	const activeClasses = 'bg-blue-300 hover:bg-blue-200';
	const inactiveClasses = 'opacity-60 hover:bg-gray-300';
	const marginWidth = 'ml-4';
</script>

<div class="grow">
	{#if isEditing}
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="text"
			class="outline-dotted outline-gray-500"
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
		/>
	{:else}
		<p on:click|stopPropagation={() => (isEditing = !isEditing)}>
			{category.name}
		</p>
	{/if}
</div>

<button
	on:click={() =>
		updateCategory(category._id, { containsCreditCopies: !category.containsCreditCopies })}
	class={marginWidth}
>
	<Icon
		icon="ant-design:credit-card-filled"
		class="{allClasses} {$$props.class} {category.containsCreditCopies
			? activeClasses
			: inactiveClasses}"
	/>
</button>

<button
	on:click={() => updateCategory(category._id, { isIncome: !category.isIncome })}
	class={marginWidth}
>
	<Icon
		icon="cil:money"
		class="{allClasses} {$$props.class} {category.isIncome
			? 'bg-green-500 hover:bg-green-300'
			: inactiveClasses}"
	/></button
>

<button on:click={() => deleteCategory(category._id)} class={marginWidth}>
	<Icon icon="carbon:delete" class="{allClasses} {$$props.class} {inactiveClasses}" /></button
>
