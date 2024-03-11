import { onError } from '@apollo/client/link/error';
import { ApolloClient, fromPromise, InMemoryCache, split } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import MUTATIONS from './mutations';

export const END_POINT = 'https://api.sellforyou.co.kr';
// export const END_POINT = "http://localhost:8987";
export const IMAGE_SERVER = 'https://img.sellforyou.co.kr/sellforyou';

let isRefreshing = false;
let pendingRequests: Array<() => void> = [];
let isNetworkWaiting = false;

const resolvePendingRequests = () => {
	pendingRequests.map((callback) => callback());
	pendingRequests = [];
};

export async function getNewToken() {
	const refreshToken = await localStorage.getItem('refreshToken');
	if (refreshToken == null) return null;
	const accessToken = await localStorage.getItem('accessToken');
	const data = {
		query: MUTATIONS.RENEW_TOKEN,
		variables: { accessToken, refreshToken },
	};

	let result = await fetch(END_POINT + '/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((response) => response.json());
	try {
		const resultData = result.data.renewToken;
		if (resultData) return resultData;

		return null;
	} catch {
		return null;
	}
}

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) => {
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);

			let forward$;

			if (message.includes('유효한 accessToken이 아닙니다.')) {
				if (!isRefreshing) {
					isRefreshing = true;

					forward$ = fromPromise(
						getNewToken()
							.then(async ({ accessToken, refreshToken }) => {
								await localStorage.setItem('accessToken', accessToken);
								await localStorage.setItem('refreshToken', refreshToken);

								resolvePendingRequests();

								return accessToken;
							})
							.catch((error) => {
								pendingRequests = [];

								localStorage.clear();

								alert(`세션이 만료 되었습니다.\n다시 로그인 해주세요.`);

								window.location.replace('/');

								return;
							})
							.finally(() => {
								isRefreshing = false;
							}),
					).filter((value) => Boolean(value));
				} else {
					forward$ = fromPromise<void>(
						new Promise((resolve) => {
							pendingRequests.push(() => resolve());
						}),
					);
				}
				return forward$.flatMap(() => forward(operation));
			}
		});
	if (networkError) {
		console.log(`[Network error]: ${networkError}`);
		if (!isNetworkWaiting) {
			isNetworkWaiting = true;
			console.log('오류 서버와의 접속이 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
		}
	}
});

const wsLink = new WebSocketLink({
	uri: `ws${END_POINT.match(/https:\/\//) ? 's' : ''}://${END_POINT.replace(/https?:\/\//, '')}/graphql`,
	options: {
		lazy: true,
		reconnect: true,
		connectionParams: async () => {
			const accessToken = await localStorage.getItem('accessToken');
			return { Authorization: accessToken ? `Bearer ${accessToken}` : '' };
		},
	},
});

const httpLink = createUploadLink({
	uri: END_POINT + '/graphql',
});

const authLink = setContext(async (_, { headers }) => {
	const token = await localStorage.getItem('accessToken');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	},
	wsLink,
	authLink.concat(httpLink as any),
);

export const client = new ApolloClient({
	link: errorLink.concat(splitLink),
	// link: errorLink.concat(authLink.concat(httpLink)),
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					// orders: offsetLimitPagination()
				},
			},
		},
	}),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'no-cache',
		},
		query: {
			fetchPolicy: 'no-cache',
		},
	},
});

export default client;
