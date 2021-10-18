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
	t.is(res, '')
})

test('Returns undefined when the passed network is arbitrum-one', async (t) => {
	const res = await addresses({ network: 'arbitrum-one' })
	t.is(res, undefined)
})
