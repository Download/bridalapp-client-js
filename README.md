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
* [bridalapp-client.umd.js](https://cdn.rawgit.com/download/bridalapp-client-js/0.0.1/bridalapp-client.umd.js)
* [bridalapp-client.min.js](https://cdn.rawgit.com/download/bridalapp-client-js/1.0.2/bridalapp-client.min.js) (~2kB, minified)


## Include in your app

### require
```js
var client = require('bridalapp-client')
```

### import
```js
import client from 'bridalapp-client'
```

### AMD
```js
define(['bridalapp-client'], function(client){
  // ...
});
```

### Script tag
```html
<script src="https://cdn.rawgit.com/download/bridalapp-client-js/0.0.1/bridalapp-client.min.js"></script>
```

## Usage
```js
import client from 'bridalapp-client'

// options are optional
var options = {
  // fetch: myFetchFunction,
  // log: myLoggerObject
}

var bridalapp = client(options)
```

## Issues
Add an issue in this project's [issue tracker](https://github.com/download/bridalapp-client-js/issues)
to let me know of any problems you find, or questions you may have.

## Copyright
Copyright 2017 by [Stijn de Witt](https://StijnDeWitt.com). Some rights reserved.

## License
Licensed under the [Creative Commons Attribution 4.0 International (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/) Open Source license.

