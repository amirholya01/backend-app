const Controller = require("../../Controller");
const {hashString} = require("../../../util/passwordHelper");
const {UserModel} = require("../../../model/user");
const {StatusCodes : HttpStatus} = require("http-status-codes")
const {validationResult} = require("express-validator");
class AuthController extends  Controller{

  async register(req, res, next){
      try {
          // Extract the user information from the request body
          const {username, email, password } = req.body;


          // Hash the user's password using bcrypt
          const hash_password = hashString(password);

          // Create a new user object in the database
          const user = await UserModel.create({ username, email, password: hash_password })
            console.log(user)
              // // If the username is already in use, catch the error and throw a custom error object
              // .catch(err => {
              //     if(err?.code === 11000){
              //         throw {status : HttpStatus.BAD_REQUEST, message : "The username is already in use"}
              //     }
              // })
          return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
              data: {
                user,
                  message: "Your registration was done successfully"
              }
          })

      }catch (e) {
          next(e);
      }
  }
}

module.exports = {
    AuthController : new AuthController()
}