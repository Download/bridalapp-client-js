import ulog from 'ulog'
import { expect } from 'chai'
import { is } from 'mics'

import Suppliers from './'

const log = ulog('bridalapp-client:suppliers:spec')


describe('Suppliers', function(){
	it('is a mixin', function(){
		expect(is(Suppliers).a('mixin')).to.eq(true)		
	})

	it('acts as a constructor', function(){
		expect(new Suppliers()).to.be.an('object')		
	})

	it('creates an instance that is-a Suppliers', function(){
		expect(is(new Suppliers()).a(Suppliers)).to.eq(true)
	})

	it('accepts an options object', function(){
		expect(new Suppliers({})).to.be.an('object')		
	})

	describe('options', function(){
		it('is an object', function(){
			expect(new Suppliers().options).to.be.an('object')
		})

		it('is a read-only property', function(){
			expect(() => {
				new Suppliers().options = {}
			}).to.throw()
		})

		it('reflects the options passed to the constructor', function(){
			expect(new Suppliers({test:true}).options.test).to.eq(true)
		})

	})

})