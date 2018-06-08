const express = require('express');
const router = express.Router();
const config = require('./../Config/config.json');
let request = require('request');
let log4js = require('log4js');
let logger = log4js.getLogger('TN-PORTAL-HANDLER');
logger.level = 'debug';

router.post('/api/*', function(req, res) {
    postRequest(config.tn_portal.serverUrl + req.path.replace('//','/'), req, res);
});
router.post('//api/*', function(req, res) {
    postRequest(config.tn_portal.serverUrl + req.path.replace('//','/'), req, res);
});

function postRequest(url, req, res) {
    let headers = {
        'Cache-Control': 'no-cache',
        'Content-Type': req.headers['Content-Type'] || 'application/json'
    };
    if (req.headers['x-access-token']) {
        headers['x-access-token'] = req.headers['x-access-token'];
    } else if(req.headers['authorization']) {
        let authorization = req.headers['authorization'];
        const Bearer = 'Bearer ';
        headers['x-access-token'] = authorization.substring(authorization.search(Bearer) + Bearer.length);
    }
    let options = { method: 'POST',
    url: url,
    headers: headers,
    body: req.body,
    json: true };

    request(options, function (error, response, body) {
        if (error) {
            logger.fatal(error);
            res.send(error);
        } else {
            res.send(body);
        }
    });
}
module.exports = router;
