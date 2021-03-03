import test from 'ava'
import { isAuthenticated } from './fetch-github-repositories'

test('Returns mainnet address1', async (t) => {
	const res = await isAuthenticated('szmarczak/http2-wrapper')
	t.true(res)
})

test('Returns mainnet address2', async (t) => {
	const res = await isAuthenticated('hogehoge')
	t.false(res)
})
