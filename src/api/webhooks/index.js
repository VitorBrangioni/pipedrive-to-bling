const { Router } = require('express');
const controller = require('./controller');
const router = new Router();

router.post('/pipedrive/updated', (req, res) => {
    controller.updated(req, res);
});

router.get('/', (req, res) => {
    controller.test(req, res);
});

exports.router = router;