<script>
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.css';
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="//cdn.materialdesignicons.com/6.5.95/css/materialdesignicons.min.css"
	/>
	<title>MWM Budget</title>
</svelte:head>
<NavBar />
<div class="m-4">
	<slot />
</div>
