import { FunctionOraclizer } from '@devprotocol/khaos-core'
import { isAuthenticated } from './fetch-github-repositories'

export const oraclize: FunctionOraclizer = async ({
	signatureOptions,
	query,
	network,
}) => {
	const incubatorAddress =
		network === 'mainnet'
			? '0x7f1b8c30832ca3ABC6326A58903A3a47ade00019'
			: '0xca98de1774F13090014660fb80367Fde970C4A72'
	const lcIncubatorAddress = incubatorAddress.toLowerCase()
	const lcAccount = String(query.allData['account']).toLowerCase()

	const test1 = query.allData['githubRepository'] === signatureOptions?.message
	const test2 =
		lcAccount === lcIncubatorAddress
			? true
			: lcAccount === signatureOptions?.address.toLowerCase()
	const test3 =
		lcAccount === lcIncubatorAddress || network === 'ropsten'
			? true
			: await isAuthenticated(query.allData['githubRepository'])

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
