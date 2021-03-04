import {
	FunctionOraclizer,
	FunctionOraclizeResults,
} from '@devprotocol/khaos-core'
import { isAuthenticated } from './fetch-github-repositories'

export const oraclize: FunctionOraclizer = async ({
	signatureOptions,
	query,
	network,
}) => {
	const incubatorAddress =
		network === 'mainnet'
			? '0x7f1b8c30832ca3ABC6326A58903A3a47ade00019'
			: '0x554c3f103894901f4ea0c4c955EB0E6fB347b5A6'

	const test1 = query.allData['githubRepository'] === signatureOptions.message
	const test2 =
		query.allData['account'] === incubatorAddress
			? true
			: query.allData['account'] === signatureOptions.address
	const test3 =
		query.allData['account'] === incubatorAddress
			? true
			: await isAuthenticated(query.allData['githubRepository'])

	return test1 && test2 && test3
		? ({
				message: signatureOptions.message,
				status: 0,
				statusMessage: 'success',
		  } as FunctionOraclizeResults)
		: ({
				message: signatureOptions.message,
				status: 2,
				statusMessage: 'error',
		  } as FunctionOraclizeResults)
}
