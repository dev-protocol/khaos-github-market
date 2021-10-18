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
	const data = await Promise.all([
		oraclize({ signatureOptions, query, network: 'ropsten' }),
		oraclize({ signatureOptions, query, network: 'arbitrum-rinkeby' }),
		oraclize({ signatureOptions, query, network: 'arbitrum-one' }),
	])
	data.forEach((res) => {
		t.is(res!.message, 'user/repository')
		t.is(res!.status, 0)
		t.is(res!.statusMessage, 'success')
	})
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
	const data = await Promise.all([
		oraclize({ signatureOptions, query, network: 'ropsten' }),
		oraclize({ signatureOptions, query, network: 'arbitrum-rinkeby' }),
		oraclize({ signatureOptions, query, network: 'arbitrum-one' }),
	])
	data.forEach((res) => {
		t.is(res!.message, 'user/REPOSITORY')
		t.is(res!.status, 2)
		t.is(res!.statusMessage, 'error: test1 = false, test2 = true, test3 = true')
	})
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
	const data = await Promise.all([
		oraclize({ signatureOptions, query, network: 'ropsten' }),
		oraclize({ signatureOptions, query, network: 'arbitrum-rinkeby' }),
		oraclize({ signatureOptions, query, network: 'arbitrum-one' }),
	])
	data.forEach((res) => {
		t.is(res!.message, 'user/repository')
		t.is(res!.status, 2)
		t.is(res!.statusMessage, 'error: test1 = true, test2 = false, test3 = true')
	})
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
	const data = await Promise.all([
		oraclize({ signatureOptions, query, network: 'ropsten' }),
		oraclize({ signatureOptions, query, network: 'arbitrum-rinkeby' }),
		oraclize({ signatureOptions, query, network: 'arbitrum-one' }),
	])
	data.forEach((res) => {
		t.is(res!.message, 'user/REPOSITORY')
		t.is(res!.status, 2)
		t.is(
			res!.statusMessage,
			'error: test1 = false, test2 = false, test3 = true'
		)
	})
})
