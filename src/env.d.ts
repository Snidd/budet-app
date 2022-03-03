interface ImportMetaEnv {
	readonly VITE_MONGODB_URL: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
