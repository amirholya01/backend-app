const {AuthController} = require("../../controller/user/auth/auth.controller");
const {registerValidation, loginValidation} = require("../../validation/user/auth");

const router = require("express").Router();


/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: Login and Register
 */
/**
 * @swagger
 *  /user/register:
 *      post:
 *          summary: register user
 *          tags: [Authentication]
 *          parameters:
 *          -   name: username
 *              description: The username must be at least 3 characters
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: email
 *              description: Please enter the correct email format
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: password
 *              description: The password should at least be between 4 and 8 characters --- start with the capital letter--includes numbers - _
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: in-authorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/register", registerValidation(), AuthController.register);

/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: Login and Register
 */
/**
 * @swagger
 *  /user/login:
 *      post:
 *          summary: login user
 *          tags: [Authentication]
 *          parameters:
 *          -   name: username
 *              description: The username must be at least 3 characters
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: password
 *              description: The password should at least be between 6 and 16 characters
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: in-authorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/login", loginValidation(), AuthController.login);

module.exports = {
    UserRoutes : router
}