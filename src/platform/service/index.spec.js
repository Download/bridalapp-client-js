import ulog from 'ulog'
import { expect } from 'chai'
import { is } from 'mics'

import Service from './'

const log = ulog('bridalapp-client:platform:service:spec')
log.log(log.name)


describe('Service', function(){
	it('is a mixin', function(){
		expect(is(Service).a('mixin')).to.eq(true)		
	})

	it('acts as a constructor', function(){
		expect(new Service()).to.be.an('object')		
	})

	it('can be invoked without new (recommended)', function(){
		expect(Service()).to.be.an('object')		
	})

	it('accepts an options object', function(){
		expect(Service({})).to.be.an('object')		
	})

	it('creates an instance that is-a Service', function(){
		expect(is(Service()).a(Service)).to.eq(true)
	})

	it('passed options are reflected in the created instance', function(){
		expect(Service({test:true}).options.test).to.eq(true)
	})

	it('The options property in the created instance is read-only', function(){
		expect(() => {
			Service().options = {}
		}).to.throw()
	})
})