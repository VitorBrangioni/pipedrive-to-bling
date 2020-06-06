const { Router } = require('express');
const bodyParser = require('body-parser');
const pipedrive = require('./pipedrive').router;
const router = Router();

router.use(bodyParser.json({limit: '10mb'}));

router.use('/pipedrive', pipedrive);

exports.router = router;