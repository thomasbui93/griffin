const native = require("./native");
const memcached = require("./mem");

module.exports = process.env.USE_MEMCACHED === "1" ? memcached : native;
