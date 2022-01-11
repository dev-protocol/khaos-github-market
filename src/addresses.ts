import { FunctionAddresses } from '@devprotocol/khaos-core'

export const addresses: FunctionAddresses = async ({ network: net }) =>
	net === 'mainnet'
		? '0x3cB902625a2B38929f807f9c841F7aecBbCe7702'
		: net === 'ropsten'
		? '0xE071bb5861e2352C89992799896D124F1bA5d599'
		: net === 'arbitrum-rinkeby'
		? '0x377B7d9C2DA6eD293EA62d2bCdA1cF54009751F8'
		: net === 'arbitrum-one'
		? '0xE642B3a60F6Ef0e6dACF2388725eb487059E7739'
		: net === 'polygon-mainnet'
		? '0x2445C5a8939d3563A29E8E5E8dc11f2BF02Ea374'
		: net === 'polygon-mumbai'
		? '0x1B0e6887a30f135dD71C61C7C3dc5cFeD09610FB'
		: undefined
