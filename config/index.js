const database = require('./database');
const layout = require('./layout');
const service = require('./service');
const session = require('./session');

module.exports = {
    database,
    layout,
    service,
    session,
    port: process.env.APPLICATION_PORT,
    cookie_secretkey: process.env.COOKIE_SECRET_KEY
}