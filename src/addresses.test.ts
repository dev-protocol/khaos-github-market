/* eslint-disable functional/immutable-data */

import test from 'ava'
import { addresses } from './addresses'

test('Returns mainnet address when the passed network is mainnet', async (t) => {
	process.env[`KHAOS_MAINNET_GITHUB_MARKET_L2`] = '0x1234567890hogehoge'
	const res = await addresses({ network: 'mainnet' })
	t.is(res, '0x1234567890hogehoge')
	process.env[`KHAOS_MAINNET_GITHUB_MARKET_L2`] = undefined
})

test('Returns arbitrum rinkeby address when the passed network is arbitrum-rinkeby', async (t) => {
	process.env[`KHAOS_ARBITRUM_RINKEBY_GITHUB_MARKET_L2`] = '0xhogehoge1234567890'
	const res = await addresses({ network: 'arbitrum-rinkeby' })
	t.is(res, '0xhogehoge1234567890')
	process.env[`KHAOS_ARBITRUM_RINKEBY_GITHUB_MARKET_L2`] = undefined
})
