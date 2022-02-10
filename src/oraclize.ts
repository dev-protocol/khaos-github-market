import { FunctionOraclizer } from '@devprotocol/khaos-core'

export const oraclize: FunctionOraclizer = async ({
	signatureOptions,
	query,
}) => {
	const lcAccount = String(query.allData['account']).toLowerCase()

	const test1 = query.allData['githubRepository'] === signatureOptions?.message
	const test2 = lcAccount === signatureOptions?.address.toLowerCase()

	return signatureOptions?.message && test1 && test2
		? {
				message: signatureOptions.message,
				status: 0,
				statusMessage: 'success',
		  }
		: {
				message: signatureOptions?.message ?? 'empty',
				status: 2,
				statusMessage: `error: test1 = ${test1}, test2 = ${test2}`,
		  }
}
