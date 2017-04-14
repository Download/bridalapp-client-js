import ulog from 'ulog'
import { mix } from 'mics'

const log = ulog('bridalapp-client:Identifiable')
log.log(log.name)

export const Identifiable = mix(superclass => class Identifiable extends superclass {
	constructor(...args) {
		super(...args)
		var id = args.length //&& args[0].id
		console.info(args.length)
		console.info(args[0])
		Object.defineProperties(this, {
			id: {get(){return id}, enumerable:true},
			setId: {get(){return newId => {id = newId; return this}}}
		})
	}
})

export default Identifiable
