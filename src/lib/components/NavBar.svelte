<script lang="ts">
	const aClasses = 'm-2 p-2 rounded-md hover:bg-slate-300';
</script>

<div class="flex gap-x-2 bg-slate-100 items-center justify-end">
	<a class={aClasses} href="/">Start</a>
	<a class={aClasses} sveltekit:prefetch href="/budget">Budget</a>
	<a class={aClasses} sveltekit:prefetch href="/categories">Kategorier</a>
	<a class={aClasses} sveltekit:prefetch href="/invoices">Klarna</a>
	<div class="h-12 ml-auto grow flex justify-end mr-2">
		<img class="opacity-75" src="/mwm.svg" alt="mwm logo" />
	</div>
</div>
