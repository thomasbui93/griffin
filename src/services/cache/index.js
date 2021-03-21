const native = require('./native')
const memcached = require('./mem')

module.exports = process.env.NODE_ENV === 'production' ? memcached : native
