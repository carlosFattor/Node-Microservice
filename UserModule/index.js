const app = require('./config/custom-express')();
require('dotenv').load();

const config = require('./config/config');

app.listen(config.app.port, () => {
    console.log(`Server runing in PORT:${config.app.port}`);
});
