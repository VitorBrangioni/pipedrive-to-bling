const { Router } = require('express');
const controller = require('./controller');
const router = new Router();

router.get('/', (req, res) => {
    controller.findOne(req, res);
});

exports.router = router;