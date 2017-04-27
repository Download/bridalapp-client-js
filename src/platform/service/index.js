import ulog from 'ulog'
import mix from 'mics'

const log = ulog('bridalapp-client:platform:service')
log.log(log.name)

var options = {}

export default mix(superclass => class Service extends superclass {
	constructor(...args) {
		super(...args)
		var options = args.length && args[0] || Service.OPTIONS
		Object.defineProperties(this, {
			options: {value:options, writable:false, enumerable:true},
		})
	}

	static get OPTIONS() {return options}
	static set OPTIONS(newOptions) {options = newOptions}
})
