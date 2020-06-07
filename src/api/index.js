const { Router } = require('express');
const bodyParser = require('body-parser');
const pipedrive = require('./pipedrive-response').router;
const webhooks = require('./webhooks').router;
const router = Router();

router.use(bodyParser.json({limit: '10mb'}));

router.use('/pipedrive', pipedrive);
router.use('/webhooks', webhooks);

exports.router = router;