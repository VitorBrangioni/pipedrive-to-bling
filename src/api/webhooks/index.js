const { Router } = require('express');
const controller = require('./controller');
const router = new Router();

router.post('/pipedrive/updated', (req, res) => {
    controller.updated(req, res);
});

exports.router = router;