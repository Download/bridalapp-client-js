# bridalapp-client-js
### Javascript client for Bridal App API Server

[![npm](https://img.shields.io/npm/v/bridalapp-client.svg)](https://npmjs.com/package/bridalapp-client)
[![license](https://img.shields.io/npm/l/bridalapp-client.svg)](https://creativecommons.org/licenses/by/4.0/)
[![travis](https://img.shields.io/travis/Download/bridalapp-client-js.svg)](https://travis-ci.org/Download/bridalapp-client-js)
[![greenkeeper](https://img.shields.io/david/Download/bridalapp-client-js.svg)](https://greenkeeper.io/)
![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)


![logo](https://cdn.rawgit.com/download/bridalapp-static/1.0.0/bridalapp/logo-bridalapp.png)

## Install with NPM
```sh
npm install --save bridalapp-client
```

## Direct download
* [bridalapp-client.umd.js](https://cdn.rawgit.com/download/bridalapp-client-js/0.1.0/bridalapp-client.umd.js)
* [bridalapp-client.min.js](https://cdn.rawgit.com/download/bridalapp-client-js/0.1.0/bridalapp-client.min.js) 


## Include in your app

### require
```js
var bridalapp = require('bridalapp-client').bridalapp
// or, if you want to use a client with custom options
var client = require('bridalapp-client').client
```

### import
```js
import { bridalapp } from 'bridalapp-client'
// or, if you want to use a client with custom options
import { client } from 'bridalapp-client'
```

### AMD
```js
define(['bridalapp-client'], function(bridalappClient){
  var bridalapp = bridalappClient.bridalapp
  // Or, if you want to use a client with custom options
  var client = bridalappClient.client
});
```

### Script tag
```html
<script src="https://cdn.rawgit.com/download/bridalapp-client-js/0.1.0/bridalapp-client.min.js"></script>
<script>
  var bridalapp = window['bridalapp-client'].bridalapp
  // Or, if you want to use a client with custom options
  var client = window['bridalapp-client'].client
</script>
```

## Usage
The easiest way is to grab the default client, `bridalapp`, that has the default options applied. Then
make API calls on it:

```js
import { bridalapp, Category } from 'bridalapp-client'

var onSale = bridalapp.products.search(Category.WEDDING_DRESSES, 'sale', 100, 0)
```

If you want to set custom options, use `client`:

```
// all options are optional
var options = {
  // fetch: myFetchFunction,
  // log: myLoggerObject
}

var myClient = client(options)

var onSale = myClient.products.search(Category.WEDDING_DRESSES, 'sale', 100, 0)
```
The objects returned by `client` are stateless and should be treated as immutable.

## Options
These options can be specified when
## Issues
Add an issue in this project's [issue tracker](https://github.com/download/bridalapp-client-js/issues)
to let me know of any problems you find, or questions you may have.

## Copyright
Copyright 2017 by [Stijn de Witt](https://StijnDeWitt.com). Some rights reserved.

## License
Licensed under the [Creative Commons Attribution 4.0 International (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/) Open Source license.

