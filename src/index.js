import ulog from 'ulog'
import mix from 'mics'
import Immutable from 'seamless-immutable'

import Service from './platform/service'
import Suppliers from './suppliers'

const log = ulog('bridalapp-client')
log.log(log.name)

const OPTIONS = Immutable({
	fetch: typeof fetch == 'function' ? fetch : noFetch,
	log,
})

const Client = mix(Service, superclass => class Client extends superclass {
	constructor(...args) {
		super(...args)
		Object.defineProperties(this, {
			suppliers: {value: Suppliers(...args), writable:false, enumerable:false},
		})
	}

	static get OPTIONS() {return Service.OPTIONS}
})

const bridalapp = Client()

export {
	bridalapp,
	Client
}
export default bridalapp

function noFetch() {
	throw new Error('Function `fetch` not found. Please create a client with a suitable function specified in the options, or use a fetch polyfill. SEE: https://fetch.spec.whatwg.org/')
}

log.info(log.name, 'Initialized')
