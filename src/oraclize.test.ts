import test from 'ava'
import { oraclize } from './oraclize'
import { PublicSignatureOptions, QueryData } from '@devprotocol/khaos-core'

test('If message and githubRepository are the same, it is treated as success.', async (t) => {
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
	const res = await oraclize({ signatureOptions, query, network: 'mainnet' })
	t.is(res!.message, 'user/repository')
	t.is(res!.status, 0)
	t.is(res!.statusMessage, 'success')
})

test('If message and githubRepository are not the same, it is treated as fail.', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'user/repository',
		id: 'github-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: { githubRepository: 'hoge/hura' } as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const res = await oraclize({ signatureOptions, query, network: 'mainnet' })
	t.is(res!.message, 'user/repository')
	t.is(res!.status, 2)
	t.is(res!.statusMessage, 'error')
})

test('succeeds if the account of the Query event is the incubator address (mainnet).', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'user/repository',
		id: 'github-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: {
			githubRepository: 'user/repository',
			account: '0x886f06F5118536589e89A719d3D9E61B330E95B6',
		} as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const res = await oraclize({ signatureOptions, query, network: 'mainnet' })
	t.is(res!.message, 'user/repository')
	t.is(res!.status, 0)
	t.is(res!.statusMessage, 'success')
})

test('if the account of Query event is an incubator address but the repository name is different, it will fail (mainnet).', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'user/repository',
		id: 'github-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: {
			githubRepository: 'huga/hoge',
			account: 'incubator address',
		} as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const res = await oraclize({ signatureOptions, query, network: 'mainnet' })
	t.is(res!.message, 'user/repository')
	t.is(res!.status, 2)
	t.is(res!.statusMessage, 'error')
})

test('succeeds if the account of the Query event is the incubator address (ropsten).', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'user/repository',
		id: 'github-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: {
			githubRepository: 'user/repository',
			account: '0x1CF5A65D5594C507D797c855D71cF5524B15a639',
		} as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const res = await oraclize({ signatureOptions, query, network: 'ropsten' })
	t.is(res!.message, 'user/repository')
	t.is(res!.status, 0)
	t.is(res!.statusMessage, 'success')
})

test('if the account of Query event is an incubator address but the repository name is different, it will fail (ropsten)..', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'user/repository',
		id: 'github-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: {
			githubRepository: 'huhuhu/hahaha',
			account: 'ropsten incubator address',
		} as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const res = await oraclize({ signatureOptions, query, network: 'ropsten' })
	t.is(res!.message, 'user/repository')
	t.is(res!.status, 2)
	t.is(res!.statusMessage, 'error')
})
