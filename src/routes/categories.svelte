<script lang="ts">
	import type { BudgetCategory } from '$model';

	export let categories: BudgetCategory[];
</script>

<ul>
	{#each categories as category}
		<li class="w-full xl:w-1/2 2xl:w-1/3 p-2 mb-2 bg-slate-300">{category.name}</li>
	{/each}
</ul>
