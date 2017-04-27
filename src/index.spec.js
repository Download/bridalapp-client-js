import ulog from 'ulog'
import { expect } from 'chai'
import { is } from 'mics'

import { bridalapp, Client } from './'

const log = ulog('bridalapp:spec')
log.log(log.name)

var fetched = []
function dummyFetch(url, options) {
  log.info('fetch', url, options)
  fetched.push({url:url, options:options, result:dummyFetch.result})
	return Promise.resolve(dummyFetch.result)
}
dummyFetch.result = {}

describe('bridalapp-client', function(){
	describe('bridalapp', function(){
		it('is an object', function(){
			expect(bridalapp).to.be.an('object')		
		})
		it('is..a client', function(){
			expect(is(bridalapp).a(Client)).to.eq(true)		
		})
		it('has a property `options`', function(){
			expect(bridalapp.options).to.be.an('object')		
		})
		it('has a property `suppliers`', function(){
			expect(bridalapp.suppliers).to.be.an('object')		
		})

		describe('options', function(){
			it('is an object', function(){
				expect(bridalapp.options).to.be.an('object')
			})

			it('is a read-only property', function(){
				expect(() => {
					bridalapp.options = {}
				}).to.throw()
			})
		})
		
	})

	describe('Client', function(){
		it('is a mixin', function(){
			expect(is(Client).a('mixin')).to.eq(true)		
		})

		it('acts as a constructor', function(){
			expect(new Client()).to.be.an('object')		
		})

		it('can be invoked without new (recommended)', function(){
			expect(Client()).to.be.an('object')		
		})

		it('accepts an options object', function(){
			expect(Client({})).to.be.an('object')		
		})

		it('returns an object that is..a Client', function(){
			expect(is(Client()).a(Client)).to.eq(true)		
		})

		it('passed options are reflected in the created instance', function(){
			expect(Client({test:true}).options.test).to.eq(true)
		})
	})

  require('./platform/service/index.spec.js')
  require('./suppliers/index.spec.js')
})