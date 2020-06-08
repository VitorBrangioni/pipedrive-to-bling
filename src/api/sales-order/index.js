const { Router } = require('express');
const controller = require('./controller');
const router = new Router();

router.get('/', (req, res) => {
    controller.findAll(req, res);
});

router.get('/merge', (req, res) => {
    controller.mergePipedriveWithBling(req, res);
});

exports.router = router;