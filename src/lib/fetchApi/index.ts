const fetchApi = async (input: RequestInfo, init?: RequestInit) => {
	return fetch(input, init);
};

export default fetchApi;
