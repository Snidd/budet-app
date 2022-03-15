const fetchApi = async (input: RequestInfo, init?: RequestInit) => {
	import.meta.env.VITE_BASEURL;
	const fetchUrl = new URL(input.toString(), import.meta.env.VITE_BASEURL).toString();
	return fetch(fetchUrl, init);
};

export default fetchApi;
