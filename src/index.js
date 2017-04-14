import ulog from 'ulog'
const log = ulog('bridalapp-client')

import BridalappClient from './platform/BridalappClient'

export default function client(options) {
	if (!options) options = client.DEFAULT_OPTIONS
	return client.clients[options] || (client.clients[options] = new BridalappClient(options))
}

client.DEFAULT_OPTIONS = {}
client.clients = {}
