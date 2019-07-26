/* eslint-disable no-console */
require('dotenv').config();

const app = require('./lib/app');

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`RUNNING ON PORT ${PORT}`);
});
