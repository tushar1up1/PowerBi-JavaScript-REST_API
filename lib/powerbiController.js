var powerbiService = require('./powerbiService');

module.exports.powerbiToken = function (req, res) {
    powerbiService.powerbiEmbedToken()
        .then(function (result) {
            res.json(result)
        })
        .catch(function (err) {
            res.sendStatus(404)
        })
};
