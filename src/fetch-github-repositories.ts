import bent from 'bent'

const URL =
	'https://raw.githubusercontent.com/dev-protocol/invitation-registry/main/data/github-repositories.json'

const fetchGithubRepositories = (
	refreshKey: string
): Promise<Record<string, boolean>> =>
	(async (fetcher) =>
		fetcher(`${URL}?${refreshKey}`, undefined, {
			'cache-control': 'no-cache',
			pragma: 'no-cache',
		}).then((r) => (r as unknown) as Record<string, boolean>))(bent('json'))

export const isAuthenticated = async (repository: string): Promise<boolean> => {
	const res = await fetchGithubRepositories(`${Math.random()}`)
	return Boolean(res[repository])
}
