/* eslint-disable functional/no-let */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import sinon from 'sinon'
import { oraclize } from './oraclize'
import { PublicSignatureOptions, QueryData } from '@devprotocol/khaos-core'
import * as fetchGithubRepositories from './fetch-github-repositories'

let isAuthenticated: sinon.SinonStub<[repository: string], Promise<boolean>>

test.before(() => {
	isAuthenticated = sinon.stub(fetchGithubRepositories, 'isAuthenticated')
	isAuthenticated.withArgs('user/repository').resolves(true)
	isAuthenticated.withArgs('hoge/huga').resolves(false)
})

//success
test('Returns success when the assert is passed; same repo, same account, and authenticated by registry', async (t) => {
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

test('Returns success when the assert is passed; same repo, sender is the incubator, and authenticated by registry', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'user/repository',
		id: 'github-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: {
			githubRepository: 'user/repository',
			account: '0x7f1b8c30832ca3ABC6326A58903A3a47ade00019',
		} as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const res = await oraclize({
		signatureOptions,
		query,
		network: 'mainnet',
	})
	t.is(res!.message, 'user/repository')
	t.is(res!.status, 0)
	t.is(res!.statusMessage, 'success')
})

test('Returns success when the assert is passed; same repo, sender is the incubator, and not authenticated by registry', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'hoge/huga',
		id: 'github-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: {
			githubRepository: 'hoge/huga',
			account: '0x7f1b8c30832ca3ABC6326A58903A3a47ade00019',
		} as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const res = await oraclize({
		signatureOptions,
		query,
		network: 'mainnet',
	})
	t.is(res!.message, 'hoge/huga')
	t.is(res!.status, 0)
	t.is(res!.statusMessage, 'success')
})

// failed
test('Returns failure when the assert is not passed; different repo, same account, and authenticated by registry', async (t) => {
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
	const res = await oraclize({ signatureOptions, query, network: 'mainnet' })
	t.is(res!.message, 'user/REPOSITORY')
	t.is(res!.status, 2)
	t.is(res!.statusMessage, 'error: test1 = false, test2 = true, test3 = true')
})

test('Returns failure when the assert is not passed; same repo, different account, and authenticated by registry', async (t) => {
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
	const res = await oraclize({ signatureOptions, query, network: 'mainnet' })
	t.is(res!.message, 'user/repository')
	t.is(res!.status, 2)
	t.is(res!.statusMessage, 'error: test1 = true, test2 = false, test3 = true')
})

test('Returns failure when the assert is not passed; same repo, same account, and not authenticated by registry', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'hoge/huga',
		id: 'github-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: { githubRepository: 'hoge/huga', account: '0x1234' } as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const res = await oraclize({ signatureOptions, query, network: 'mainnet' })
	t.is(res!.message, 'hoge/huga')
	t.is(res!.status, 2)
	t.is(res!.statusMessage, 'error: test1 = true, test2 = true, test3 = false')
})

test('Returns failure when the assert is not passed; different repo, different account, and not authenticated by registry', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'hoge/HUGA',
		id: 'github-market',
		address: '0x12345',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: { githubRepository: 'hoge/huga', account: '0x1234' } as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const res = await oraclize({ signatureOptions, query, network: 'mainnet' })
	t.is(res!.message, 'hoge/HUGA')
	t.is(res!.status, 2)
	t.is(res!.statusMessage, 'error: test1 = false, test2 = false, test3 = false')
})

test('Returns failure when the assert is not passed; different repo, sender is the incubator, and authenticated by registry', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'hoge/HUGA',
		id: 'github-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: {
			githubRepository: 'hoge/huga',
			account: '0x7f1b8c30832ca3ABC6326A58903A3a47ade00019',
		} as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const res = await oraclize({
		signatureOptions,
		query,
		network: 'mainnet',
	})
	t.is(res!.message, 'hoge/HUGA')
	t.is(res!.status, 2)
	t.is(res!.statusMessage, 'error: test1 = false, test2 = true, test3 = true')
})

test('Returns failure when the assert is not passed; different repo, sender is the incubator, and not authenticated by registry', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'hoge/huga',
		id: 'github-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: {
			githubRepository: 'hoge/HUGA',
			account: '0x7f1b8c30832ca3ABC6326A58903A3a47ade00019',
		} as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const res = await oraclize({
		signatureOptions,
		query,
		network: 'mainnet',
	})
	t.is(res!.message, 'hoge/huga')
	t.is(res!.status, 2)
	t.is(res!.statusMessage, 'error: test1 = false, test2 = true, test3 = true')
})

test.after(() => {
	isAuthenticated.restore()
})
