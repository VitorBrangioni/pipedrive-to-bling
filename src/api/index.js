const { Router } = require('express');
const bodyParser = require('body-parser');
const pipedriveResponse = require('./pipedrive-response').router;
const blingResponse = require('./bling-response').router;
const webhooks = require('./webhooks').router;
const router = Router();

router.use(bodyParser.json({limit: '10mb'}));

router.use('/pipedrive-response', pipedriveResponse);
router.use('/bling-response', blingResponse);
router.use('/webhooks', webhooks);

exports.router = router;