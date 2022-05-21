import { createServer } from '@graphql-yoga/common';
import { createRemoteSchema } from './schema';
// import { useDisableIntrospection } from '@envelop/disable-introspection';
// import { useDepthLimit } from '@envelop/depth-limit';

addEventListener('fetch', (event) => {
	return event.respondWith(handleRequest(event));
});

async function handleRequest(event: FetchEvent) {
	// Get Secret Values from Edge Dictionary
	const secret = new Dictionary('secret');
	const token = secret.get('token');
	const url = secret.get('url');
	const backend = secret.get('backend');

	const schema = await createRemoteSchema(url, token, backend);
	const server = createServer({
		schema,
		parserCache: true,
		validationCache: true,
		// You Can UnComment cors, if you need to set CORS Blocking
		/* cors: {
			origin: ['https://my-website.com'],
			allowedHeaders: ['content-type', 'charset'],
			methods: ['GET', 'HEAD', 'POST'],
			maxAge: 86400
		}, */
		plugins: [
			/* You Can UnComment useDepthLimit, if your need to set Query Depth limit */
			// useDepthLimit({ maxDepth: 5 }),
			/* You Can useDisableIntrospection, if your need to set Disable Introspection */
			// useDisableIntrospection(),
		],
	});

	return server.handleRequest(event.request);
}
