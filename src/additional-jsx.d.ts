declare namespace svelte.JSX {
	interface HTMLProps<T> {
		// If you want to use on:beforeinstallprompt
		onupdate?: (event: CustomEvent<string>) => any;
	}
}
