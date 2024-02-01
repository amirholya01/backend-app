const Application = require("./app/server");
require("dotenv").config();

const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;

new Application(PORT, DB_HOST)