import ulog from 'ulog'
import { mix } from 'mics'
import Immutable from 'seamless-immutable'

const log = ulog('bridalapp-client:platform:Duration')
log.log(log.name)

export const Duration = mix(superclass => class Duration extends superclass {
	static suffixes = Immutable{ms: 1, sec: 1000, min: 1000 * 60, hr: 1000 * 60 * 60}

	constructor(t) {
    var ms = (function(){
			var num, multiplier, 
			if (typeof t === "number") return t
			if (typeof t === "string") {
				const matches = t.match(/^([\d.]+)(.+)$/)
				if (matches) {
					var num = +matches[1]
					if (multiplier = Duration.suffixes[matches[2]]) return num * multiplier
				}
			} 
			if (typeof t === "object" && t.units && t.value) {
				if (multiplier = suffixes[t.units]) return t.value * multiplier
			}            
			throw new Error("Invalid time argument for delay()")
		}
}

