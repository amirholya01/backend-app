const Joi = require("joi");

const registerValidator = Joi.object({
    username: Joi.string().min(4).max(16).required().error(new Error("The username must be at least 4 and maximum 16 characters")),
    email: Joi.string().email().required().error(new Error("this email is not allowed")),
    password: Joi.string().pattern(new RegExp('\\b[A-Z][a-zA-Z_-]{3,9}\\b\n')).required()
        .error(new Error("The password must start with the capital word and it can include _ and -; the maximum length can be 10 and a minimum of 4 characters."))
})

module.exports = {
    registerValidator
}