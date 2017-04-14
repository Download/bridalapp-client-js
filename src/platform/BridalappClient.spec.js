import ulog from 'ulog'
const log = ulog('bridalapp:BridalappClient:spec')

import { expect } from 'chai'
import { is } from 'mics'

import BridalappClient from './BridalappClient'

describe('BridalappClient', function(){
	it('is a mixin', function(){
		expect(is(BridalappClient).a('mixin')).to.eq(true)		
	})

	it('acts as a constructor', function(){
		expect(new BridalappClient()).to.be.an('object')		
	})

	it('creates an instance that is-a BridalappClient', function(){
		expect(is(new BridalappClient()).a(BridalappClient)).to.eq(true)
	})

	it('accepts an options object', function(){
		expect(new BridalappClient({})).to.be.an('object')		
	})

	describe('options', function(){
		it('is an object', function(){
			expect(new BridalappClient().options).to.be.an('object')
		})

		it('is a read-only property', function(){
			expect(() => {
				new BridalappClient().options = {}
			}).to.throw()
		})

		it('reflects the options passed to the constructor', function(){
			expect(new BridalappClient().options).to.be.an('object')
		})

	})

	require('./platform/Identifiable.spec')
})