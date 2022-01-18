/* eslint-disable functional/no-let */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import { oraclize } from './oraclize'
import { PublicSignatureOptions, QueryData } from '@devprotocol/khaos-core'

//success
test('Returns success when the assert is passed; same repo, same account', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'user/repository',
		id: 'github-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: { githubRepository: 'user/repository', account: '0x1234' } as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const data = await oraclize({ signatureOptions, query, network: 'mainnet' })
	t.is(data!.message, 'user/repository')
	t.is(data!.status, 0)
	t.is(data!.statusMessage, 'success')
})

test('Returns failure when the assert is not passed; different repo, same account', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'user/REPOSITORY',
		id: 'github-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: { githubRepository: 'user/repository', account: '0x1234' } as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const data = await oraclize({ signatureOptions, query, network: 'ropsten' })
	t.is(data!.message, 'user/REPOSITORY')
	t.is(data!.status, 2)
	t.is(data!.statusMessage, 'error: test1 = false, test2 = true')
})

test('Returns failure when the assert is not passed; same repo, different account', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'user/repository',
		id: 'github-market',
		address: '0x12345',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: { githubRepository: 'user/repository', account: '0x1234' } as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const data = await oraclize({
		signatureOptions,
		query,
		network: 'arbitrum-rinkeby',
	})
	t.is(data!.message, 'user/repository')
	t.is(data!.status, 2)
	t.is(data!.statusMessage, 'error: test1 = true, test2 = false')
})

test('Returns failure when the assert is not passed; different repo, different account', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'user/REPOSITORY',
		id: 'github-market',
		address: '0x12345',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: { githubRepository: 'user/repository', account: '0x1234' } as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const data = await oraclize({
		signatureOptions,
		query,
		network: 'arbitrum-one',
	})
	t.is(data!.message, 'user/REPOSITORY')
	t.is(data!.status, 2)
	t.is(data!.statusMessage, 'error: test1 = false, test2 = false')
})
