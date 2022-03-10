import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { graphql, rest } from 'msw';
import fetch, {
	// @ts-ignore
	Blob,
	// @ts-ignore
	blobFrom,
	// @ts-ignore
	blobFromSync,
	// @ts-ignore
	File,
	// @ts-ignore
	fileFrom,
	// @ts-ignore
	fileFromSync,
	// @ts-ignore
	FormData,
	Headers,
	Request,
	Response
} from 'node-fetch';

const posts = [
	{
		userId: 1,
		id: 1,
		title: 'first post title',
		body: 'first post body'
	}
	// ...
];

export const restHandlers = [
	rest.get('https://rest-endpoint.example/path/to/posts', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(posts));
	}),
	rest.post('/api/category', (req, res, ctx) => {
		return res(ctx.status(204));
	})
];

const graphqlHandlers = [
	graphql.query('https://graphql-endpoint.example/api/v1/posts', (req, res, ctx) => {
		return res(ctx.data(posts));
	})
];

const server = setupServer(...restHandlers, ...graphqlHandlers);

// Start server before all tests
beforeAll(() => {
	if (!globalThis.fetch) {
		// @ts-ignore
		globalThis.fetch = fetch;
		// @ts-ignore
		globalThis.Headers = Headers;
		// @ts-ignore
		globalThis.Request = Request;
		// @ts-ignore
		globalThis.Response = Response;
	}
	return server.listen({ onUnhandledRequest: 'error' });
});

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
