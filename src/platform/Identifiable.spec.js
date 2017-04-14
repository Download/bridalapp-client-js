import { expect } from 'chai'
import ulog from 'ulog'
const log = ulog('bridalapp:Identifiable:spec')

import { is } from 'mics'

import Identifiable from './Identifiable'

describe('Identifiable', () => {
	it('is a mixin', function(){
		expect(is(Identifiable).a('mixin')).to.eq(true)
	})

	it('creates a new Identifiable object', () => {
		expect(new Identifiable()).to.be.an('object')
	})

	describe('id', () => {
		it('instances have a read-only id', () => {
			var x = new Identifiable()
			expect('id' in x).to.eq(true)
			var failed
			try {x.id = 'Test'} 
			catch(e) {failed = true}
			expect(failed).to.eq(true)
		})
	})

	describe('setId', () => {
		it('is a function', function(){
			var x = new Identifiable()
			expect(x).to.have.a.property('setId')
			expect(x.setId).to.be.a('function')
		})
		it('sets the id', () => {
			var x = new Identifiable()
			x.setId('hi')
			expect(x.id).to.eq('hi')
		})

		it('returns `this`', () => {
			var x = new Identifiable()
			var result = x.setId('hi')
			expect(result).to.eq(x)
		})
	})

})