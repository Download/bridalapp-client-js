var path = require('path')
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var cfg = Object.assign({}, require('../webpack.config'))

// --output-path test --output-filename index.spec.js \"mocha-loader!./index.spec.js\" --content-base test --port 8888
cfg.entry = ['mocha-loader!./index.spec.js']
if (!cfg.output) cfg.output = {}
cfg.output.path = path.join(__dirname, 'test')
cfg.output.filename = 'index.spec.js'

var devServerCfg = Object.assign({}, cfg.devServer, {
    publicPath: '/',
    contentBase: 'test',
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true,
        chunks: false,
        'errors-only': true
    }
})

console.info(cfg);
console.info(devServerCfg);

var server = new WebpackDevServer(webpack(cfg), devServerCfg)

server.listen(8888, 'localhost', function (err) {
    if (err) console.error(err)
    else console.info(`Listening at http://localhost:8888/`)
})