import test from 'ava'
import { fetchGithubRepositories } from './fetch-github-repositories'

test('Returns mainnet address1', async (t) => {
	const res = await fetchGithubRepositories()
	console.log(res)
	const map = new Map<string, string>();
	map.set("key1", "value1");
	const readonlyMap: ReadonlyMap<string, string> = map;
	console.log(readonlyMap.keys())
	console.log(res.keys())
})
