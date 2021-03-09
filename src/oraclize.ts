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
			: '0x59D4b114866920eD57FfAdF14A9E84a11e41217B'

	const test1 = query.allData['githubRepository'] === signatureOptions.message
	const test2 =
		query.allData['account'] === incubatorAddress
			? true
			: query.allData['account'] === signatureOptions.address
	const test3 =
		query.allData['account'] === incubatorAddress
			? true
			: await isAuthenticated(query.allData['githubRepository'])

	// eslint-disable-next-line functional/no-expression-statement
	console.log('github-market', { signatureOptions, query, network })

	return test1 && test2 && test3
		? ({
				message: signatureOptions.message,
				status: 0,
				statusMessage: 'success',
		  } as FunctionOraclizeResults)
		: ({
				message: signatureOptions.message,
				status: 2,
				statusMessage: `error: test1 = ${test1}, test2 = ${test2}, test3 = ${test3}`,
		  } as FunctionOraclizeResults)
}
