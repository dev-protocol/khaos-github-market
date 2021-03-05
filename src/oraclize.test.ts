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
test('same repository, same account, authenticated repositories.(not incubator, mainnet)', async (t) => {
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

test('same repository, same account, authenticated repositories.(not incubator, ropsten)', async (t) => {
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
	const res = await oraclize({ signatureOptions, query, network: 'ropsten' })
	t.is(res!.message, 'user/repository')
	t.is(res!.status, 0)
	t.is(res!.statusMessage, 'success')
})

test('same repository, different account, not authenticated repositories.(incubator, mainnet)', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'hogehoge/hugahuga',
		id: 'github-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: {
			githubRepository: 'hogehoge/hugahuga',
			account: '0x7f1b8c30832ca3ABC6326A58903A3a47ade00019',
		} as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const res = await oraclize({ signatureOptions, query, network: 'mainnet' })
	t.is(res!.message, 'hogehoge/hugahuga')
	t.is(res!.status, 0)
	t.is(res!.statusMessage, 'success')
})

test('same repository, same account, authenticated repositories.(incubator, ropsten)', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'user/repository',
		id: 'github-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: {
			githubRepository: 'user/repository',
			account: '0x59D4b114866920eD57FfAdF14A9E84a11e41217B',
		} as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const res = await oraclize({ signatureOptions, query, network: 'ropsten' })
	t.is(res!.message, 'user/repository')
	t.is(res!.status, 0)
	t.is(res!.statusMessage, 'success')
})

// failed
test('different repository, same account, authenticated repositories.(not incubator, mainnet)', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'hoge/huga',
		id: 'github-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: { githubRepository: 'user/repository', account: '0x1234' } as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const res = await oraclize({ signatureOptions, query, network: 'mainnet' })
	t.is(res!.message, 'hoge/huga')
	t.is(res!.status, 2)
	t.is(res!.statusMessage, 'error')
})

test('same repository, different account, authenticated repositories.(not incubator, mainnet)', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'user/repository',
		id: 'github-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: { githubRepository: 'user/repository', account: '0x12345' } as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const res = await oraclize({ signatureOptions, query, network: 'mainnet' })
	t.is(res!.message, 'user/repository')
	t.is(res!.status, 2)
	t.is(res!.statusMessage, 'error')
})

test('same repository, same account, not authenticated repositories.(not incubator, mainnet)', async (t) => {
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
	t.is(res!.statusMessage, 'error')
})

test('different repository, same account, authenticated repositories.(incubator, mainnet)', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'huge/hoge',
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
	const res = await oraclize({ signatureOptions, query, network: 'mainnet' })
	t.is(res!.message, 'huge/hoge')
	t.is(res!.status, 2)
	t.is(res!.statusMessage, 'error')
})

test('different repository, same account, authenticated repositories.(incubator, ropsten)', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'huge/hoge',
		id: 'github-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: {
			githubRepository: 'user/repository',
			account: '0x59D4b114866920eD57FfAdF14A9E84a11e41217B',
		} as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const res = await oraclize({ signatureOptions, query, network: 'ropsten' })
	t.is(res!.message, 'huge/hoge')
	t.is(res!.status, 2)
	t.is(res!.statusMessage, 'error')
})

test.after(() => {
	isAuthenticated.restore()
})
