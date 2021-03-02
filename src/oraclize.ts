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
			? '0x886f06F5118536589e89A719d3D9E61B330E95B6'
			: '0x1CF5A65D5594C507D797c855D71cF5524B15a639'

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
