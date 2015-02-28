var env = process.env.NODE_ENV || 'local';

module.exports = require('../config/' + env + '.json');
module.exports.env = env;