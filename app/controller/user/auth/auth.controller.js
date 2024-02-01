const Controller = require("../../Controller");
const {registerValidator} = require("../../../validation/user/auth.schema");

class AuthController extends  Controller{

    //register user
    async register(req, res, next){
        try{
            await registerValidator.validateAsync(req.body);
            
        }catch (e) {
            next(e);
        }
    }
}

module.exports = {
    AuthController : new AuthController()
}