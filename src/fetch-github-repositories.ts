import bent from 'bent'
import { always } from 'ramda'

const URL =
	'https://raw.githubusercontent.com/dev-protocol/invitation-registry/main/data/github-repositories.json'

const fetchGithubRepositories = always(
	(async (fetcher) =>
		fetcher(`${URL}?${Math.random()}`).then((r) => (r as unknown) as ReadonlyMap<string, boolean>))(
			bent('json')
		)
)

export const isAuthenticated = async (
	repository: string
): Promise<boolean> => {
	const res = await fetchGithubRepositories()
	const record = Object.entries(res)
		.filter(([repositoryName, isAuthenticateValue]) => {
			return repositoryName === repository && Boolean(isAuthenticateValue)
		})
	return record.length > 0
}
