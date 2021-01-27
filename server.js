require('app-module-path').addPath(__dirname);
const App=require('app');
require('dotenv').config();
global.config = require('./config')
/*   process.on('warning', (warning) => {
    console.log(warning.stack);
});   */

new App();