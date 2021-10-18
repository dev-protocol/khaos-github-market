import { FunctionAddresses } from '@devprotocol/khaos-core'

export const addresses: FunctionAddresses = async ({ network: net }) =>
	net === 'mainnet'
		? '0x3cB902625a2B38929f807f9c841F7aecBbCe7702'
		: net === 'ropsten'
		? '0xE071bb5861e2352C89992799896D124F1bA5d599'
		: net === 'arbitrum-rinkeby'
		? ''
		: undefined
