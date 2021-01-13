const database = require('./database');
const layoutes = require('./layoutes');
const service = require('./service');
const session = require('./session');

module.exports = {
    database,
    layoutes,
    service,
    session,
    port: process.env.APPLICATION_PORT,
    cookie_secretkey: process.env.COOKIE_SECRETKEY
}