const { PipedriveRes } = require('../../config/models');

exports.updated = (req, res) => {
    PipedriveRes.create(res.body)
        .then(mgRes => {
            console.log(mgRes);

            res.sendStatus(201);
        })
    console.log(req.body);
};