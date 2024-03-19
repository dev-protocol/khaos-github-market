import test from 'ava'
import { authorize } from './authorize'
import Sinon from 'sinon'
import * as bent from 'bent'

const OK_NAME = '**NAME'
const OK_OWNER = '**OWNER'
const OK_SECRET = '**f9092'
const stub = Sinon.stub(bent, 'default')
stub.returns(async (_, body, header) => {
	const { query } = body as any
	return query.includes(OK_NAME) &&
		query.includes(OK_OWNER) &&
		header?.Authorization === `bearer ${OK_SECRET}`
		? { data: { repository: { viewerPermission: 'ADMIN' } } }
		: !query.includes(OK_NAME) || !query.includes(OK_OWNER)
		? { data: { repository: undefined } }
		: header?.Authorization !== `bearer ${OK_SECRET}`
		? { data: { repository: { viewerPermission: 'FOO' } } }
		: { errors: [{ message: 'error' }] }
})

test('Successful authentication.', async (t) => {
	const res = await authorize({
		message: `${OK_OWNER}/${OK_NAME}`,
		secret: OK_SECRET,
	} as any)
	t.true(res)
})

test('If the user does not exist, the authentication fails.', async (t) => {
	const res = await authorize({
		message: `foo/${OK_NAME}`,
		secret: OK_SECRET,
	} as any)
	t.false(res)
})

test('If the repository does not exist, the authentication fails', async (t) => {
	const res = await authorize({
		message: `${OK_OWNER}/foo`,
		secret: OK_SECRET,
	} as any)
	t.false(res)
})

test('If the pat does not exist, the authentication fails', async (t) => {
	const res = await authorize({
		message: `${OK_OWNER}/${OK_NAME}`,
		secret: 'foo',
	} as any)
	t.false(res)
})
