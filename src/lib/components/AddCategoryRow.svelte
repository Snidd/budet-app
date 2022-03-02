<script lang="ts">
	export let categoryId: number;
</script>

<tr
	class="whitespace-nowrap cursor-cell hover:bg-green-100 opacity-60 group"
	on:click={() => console.log(categoryId)}
>
	<td class="px-6 py-2 text-xs text-center italic" colspan={4}
		><span class="invisible group-hover:visible">Lägg till rad...</span></td
	>
</tr>
