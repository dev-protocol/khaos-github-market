import { FunctionOraclizer } from '@devprotocol/khaos-core'
import { isAuthenticated } from './fetch-github-repositories'

export const oraclize: FunctionOraclizer = async ({
	signatureOptions,
	query,
	network,
}) => {
	const lcAccount = String(query.allData['account']).toLowerCase()

	const test1 = query.allData['githubRepository'] === signatureOptions?.message
	const test2 = lcAccount === signatureOptions?.address.toLowerCase()
	const test3 =
		network === 'mainnet'
			? await isAuthenticated(query.allData['githubRepository'])
			: true

	return signatureOptions?.message && test1 && test2 && test3
		? {
				message: signatureOptions.message,
				status: 0,
				statusMessage: 'success',
		  }
		: {
				message: signatureOptions?.message ?? 'empty',
				status: 2,
				statusMessage: `error: test1 = ${test1}, test2 = ${test2}, test3 = ${test3}`,
		  }
}
