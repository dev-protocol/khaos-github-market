import bent from 'bent'
import { always } from 'ramda'

const URL =
	'https://raw.githubusercontent.com/dev-protocol/invitation-registry/main/data/github-repositories.json'

export const fetchGithubRepositories = always(
	(async (fetcher) =>
		fetcher(`${URL}?${Math.random()}`).then((r) => (r as unknown) as ReadonlyMap<string, boolean>))(
			bent('json')
		)
)
