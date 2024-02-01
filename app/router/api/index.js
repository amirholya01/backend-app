const {HomeController} = require("../../controller/api/home.controller");
const router = require("express").Router();

router.get("/", HomeController.indexPage);


module.exports = {
    HomeRoutes : router
}