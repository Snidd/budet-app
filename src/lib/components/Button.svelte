<script lang="ts">
	export let label: string;
</script>

<button
	on:click|stopPropagation
	class="py-1 pr-3 px-2 shadow-md no-underline rounded-full bg-blue-400 text-white font-sans font-semibold text-xs border-blue btn-primary hover:text-white hover:bg-blue-200 focus:outline-none active:shadow-none mr-2"
	>{label}</button
>
