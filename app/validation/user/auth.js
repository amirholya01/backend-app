// /^[A-Z][a-zA-Z0-9_-]{3,7}$/

const {body} = require("express-validator");
const {UserModel} = require("../../model/user");

// Define validation rules using express-validator middleware

// Function for validating user register
function registerValidation(){
    return [
        body("username").isString().isLength({min: 3, max: 16}).notEmpty()
            .custom(async username => {
            if(username){
                const user_name = await UserModel.findOne({username: username});
                if(user_name) throw "username is duplicate";
                return true;
            }
            throw "this username isn't allowed"
        }),
        body("email").isString().isEmail().notEmpty().custom(async email => {
            const user = await UserModel.findOne({email})
            if(user) throw "email was used before";
            return true;
        }),
        body("password").custom(async (val, ctx) => {
            if(val){
                const passwordRegex = /^[A-Z][a-zA-Z0-9_-]{3,7}$/
                if(passwordRegex.test(val)){
                    return true;
                }
            }
        }).withMessage("The password must start with the capital word and it can include _ and - and numbers; the maximum length can be 8 and a minimum of 4 characters")
    ]
}

// Function for validating user login
function loginValidation(){
    return[
        body("username").isString().isLength({min: 3, max: 16}).notEmpty()
            .custom(async username => {
                if(username){
                    const user_name = await UserModel.findOne({username: username});
                    if(user_name) throw "username is duplicate";
                    return true;
                }
                throw "this username isn't allowed"
            }),
        body("password").custom(async (val, ctx) => {
            if(val){
                const passwordRegex = /^[A-Z][a-zA-Z0-9_-]{3,7}$/
                if(passwordRegex.test(val)){
                    return true;
                }
            }
        }).withMessage("The password must start with the capital word and it can include _ and - and numbers; the maximum length can be 8 and a minimum of 4 characters")
    ]
}

module.exports = {
    registerValidation,
    loginValidation
}