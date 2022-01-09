import test from 'ava'
import { addresses } from './addresses'

test('Returns mainnet address when the passed network is mainnet', async (t) => {
	const res = await addresses({ network: 'mainnet' })
	t.is(res, '0x3cB902625a2B38929f807f9c841F7aecBbCe7702')
})

test('Returns ropsten address when the passed network is ropsten', async (t) => {
	const res = await addresses({ network: 'ropsten' })
	t.is(res, '0xE071bb5861e2352C89992799896D124F1bA5d599')
})

test('Returns arbitrum rinkeby address when the passed network is arbitrum-rinkeby', async (t) => {
	const res = await addresses({ network: 'arbitrum-rinkeby' })
	t.is(res, '0x377B7d9C2DA6eD293EA62d2bCdA1cF54009751F8')
})

test('Returns empty string when the passed network is arbitrum-one', async (t) => {
	const res = await addresses({ network: 'arbitrum-one' })
	t.is(res, '0xE642B3a60F6Ef0e6dACF2388725eb487059E7739')
})

test('Returns polygon mainnet address when the passed network is polygon-mainnet', async (t) => {
	const res = await addresses({ network: 'polygon-mainnet' })
	t.is(res, '0x2445C5a8939d3563A29E8E5E8dc11f2BF02Ea374')
})
