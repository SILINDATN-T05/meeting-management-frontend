// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const portal_handler = require('./server-side/portal-post-handler');
let compression = require('compression');
let path = require('path')
let serveStatic = require('serve-static')
let log4js = require('log4js');
let fs = require('fs')
let https = require('https');
// let h5bp = require('h5bp');
let pagespeed = require('pagespeed');
// var expressStaticGzip = require("express-static-gzip");

// var httpsOptions = {
//   key: fs.readFileSync('./cert/server.key')
//     , cert: fs.readFileSync('./cert/server.crt')
// }
let logger = log4js.getLogger('TN-PORTAL');
logger.level = 'debug';
// Run the app by serving the static files
// in the dist directory

let time = new Date();
// app.configure( function( ) {
    app.use( pagespeed.middleware( { debug: true } ));
// }
// app.use(h5bp({ root: __dirname + '/dist' }));
app.set('view cache', true);
// app.use("/", expressStaticGzip(__dirname + '/dist', { indexFromEmptyFile: false }));
app.use(compression());
// app.use(function(req, res, next) {
//     res.setHeader("Content-Security-Policy", "default-src https:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline'; img-src https: data:; frame-src https: data:;object-src https: data:;");
//     return next();
// });
app.use(serveStatic(__dirname + '/dist', {
    maxAge: '86400',
    setHeaders: setCustomCacheControl
  }));  
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '500mb'}));
app.use(express.static(__dirname + 'dist'));
app.use(portal_handler);
app.get('/*', function(req, res){
    res.sendFile('dist/index.html');
})
// for secure server
// https.createServer(httpsOptions, app).listen(process.env.PORT || 8080, function() {
//     let _time = new Date();
//     logger.info('SERVER STARTUP COMPLETED [', _time - time, 'ms]', 8080);

// });
// Start the app by listening on the default
app.listen(process.env.PORT || 8080, function() {
    let _time = new Date();
    logger.info('SERVER STARTUP COMPLETED [', _time - time, 'ms]');
    // EmailService.startServices();
});

function setCustomCacheControl (res, path) {
    //if (serveStatic.mime.lookup(path) === 'text/html') {
      // Custom Cache-Control for HTML files
      res.setHeader('Cache-Control', 'public, max-age=86400')
    //}
  }
