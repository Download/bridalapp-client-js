import ulog from 'ulog'
import mix from 'mics'

import Service from '../platform/service'

const log = ulog('bridalapp-client:suppliers')
log.log(log.name)

export default mix(Service, superclass => class Suppliers extends superclass {
	constructor(...args) {
		super(...args)
		Object.defineProperties(this, {
		})
	}

	search() {
		return {
			total: 0,
			pages: {},
		}
	}
})
