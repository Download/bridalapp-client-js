import ulog from 'ulog'
import { expect } from 'chai'
import { is } from 'mics'
import Keycloak from 'keycloak'

import { bridalapp, Client } from './'

const log = ulog('bridalapp:spec')
log.log(log.name)

const API = 'http://localhost:8080/ba-catwalk/api'

const keycloak = Keycloak({
		url: 'http://localhost:8080/auth',
		realm: 'master',
		clientId: 'bridalapp-ui'
});
keycloak.init().success(function (authenticated) {
	//
}).error(function () {
	//
	});

function call(url, options, authenticate) {
	options = Object.assign({}, options)
	if (!options.headers) options.headers = {}
	if (!options.headers.Accept) options.headers.Accept = 'application/json'
	if (authenticate) {
		if (!keycloak.authenticated) keycloak.login()
		if (!options.headers.Authorization) options.headers.Authorization = 'Bearer ' + keycloak.token
	} 
	return (
		fetch(API + url, options)
		.then(res => res.status == 200 ? res.json() : new Error(res.statusText))
		.then(json => log.log('call \'' + url + '\'', options, ' ==> ', json) && json)
		.catch(error => {
			log.error('call \'' + url + '\'', options, ' ==>  ERROR: ', error.message, error)
			throw error
		})
	)
}

describe('bridalapp-client', function(){
	describe('bridalapp', function(){
		it('can fetch a public resource', function (done) {
			try {
				var actual = x => x.length
				var expected = x => x > 0
				call('/suppliers')
				.then(results => {
					expect(actual(results)).to.eq(expected(results))
					done()
				})
				.catch(done)
			}
			catch (error) {
				done(error)
			}
		})

		it('can fetch a private resource', function(done){
			try {
				var actual = x => x.length
				var expected = x => x > 0
				call('/suppliers/test').then(results => {
					expect(actual(results)).to.eq(expected(results))
					done()
				}).catch(done)
			}
			catch (error) {
				done(error)
			}
		})
	})
})