import { FunctionAddresses, NetworkName } from '@devprotocol/khaos-core'

export const addresses: FunctionAddresses = async ({ network: net }) => {
	const keyName = getKeyNameFromNetworkName(net)
	return process.env[`KHAOS_${keyName}_GITHUB_MARKET_L2`]
}

const getKeyNameFromNetworkName = (network: NetworkName): string => {
	return network.toUpperCase().replace('-', '_')
}
