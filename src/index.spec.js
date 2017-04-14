import { expect } from 'chai'
import ulog from 'ulog'
const log = ulog('bridalapp:spec')

import client from './'

var fetched = []
function dummyFetch(url, options) {
  log.info('fetch', url, options)
  fetched.push({url:url, options:options, result:dummyFetch.result})
	return dummyFetch.result
}
dummyFetch.result = {}

describe('Bridal App API Client', function(){
	it('is a function', function(){
		expect(client).to.be.a('function')		
	})

	it('returns an object', function(){
		expect(client()).to.be.an('object')		
	})

	it('accepts an options object', function(){
		expect(client({})).to.be.an('object')		
	})

	require('./platform/Identifiable.spec')
})