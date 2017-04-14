import ulog from 'ulog'
import { mix } from 'mics'

const log = ulog('bridalapp-client:BridalappClient')
log.log(log.name)

export const BridalappClient = mix(superclass => class BridalappClient extends superclass {
	constructor(...args) {
		super(...args)
		var options = args.length && args[0]
		Object.defineProperties(this, {
			options: {get:() => options, enumerable:true},
		})
	}
})

export default BridalappClient
