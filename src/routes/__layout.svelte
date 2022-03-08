<script>
	import '../app.css';
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="//cdn.materialdesignicons.com/6.5.95/css/materialdesignicons.min.css"
	/>
	<title>Budget {new Date().getFullYear()}</title>
</svelte:head>
<div class="m-4">
	<slot />
</div>
