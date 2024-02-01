const {HomeRoutes} = require("./api");
const {UserRoutes} = require("./user/auth");
const router = require("express").Router();




router.use("/user", UserRoutes);
router.use("/", HomeRoutes);

module.exports = {
    AllRoutes : router
}