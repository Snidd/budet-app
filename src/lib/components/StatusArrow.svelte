<script lang="ts">
	export let previousTotal: number;
	export let currentTotal: number;
	export let isIncome: boolean;
</script>

{#if isIncome}
	{#if currentTotal < previousTotal}
		<span class="ml-1 text-red-500">↓</span>
	{:else if currentTotal > previousTotal}
		<span class="ml-1 text-green-600">↑</span>
	{/if}
{:else if currentTotal > previousTotal}
	<span class="ml-1 text-red-500">↑</span>
{:else if currentTotal < previousTotal}
	<span class="ml-1 text-green-600">↓</span>
{/if}
