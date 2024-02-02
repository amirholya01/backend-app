const Controller = require("../../Controller");
const {hashString} = require("../../../util/passwordHelper");
const {UserModel} = require("../../../model/user");
const {StatusCodes : HttpStatus} = require("http-status-codes")
const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
class AuthController extends  Controller{

    //register
  async register(req, res, next){
      try {
          // Extract the user information from the request body
          const {username, email, password } = req.body;


          // Hash the user's password using bcrypt
          const hash_password = hashString(password);

          // Create a new user object in the database
          const user = await UserModel.create({ username, email, password: hash_password })
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


  //login
    async login(req, res, next){
      try {
          const {username, password} = req.body;

          // Find the user by their username in the database
          const user = await UserModel.findOne({username}).select('_id username password');

          // If no user is found, throw an error
          if(!user) throw {status : HttpStatus.BAD_REQUEST, message : "The username or password is incorrect"}

          // Compare the password entered by the user to the hash stored in the database
          const compareResult = bcrypt.compareSync(password, user.password);

          // If the passwords don't match, throw an error
          if(!compareResult) throw {status : HttpStatus.BAD_REQUEST, message : "The username or password is incorrect"}

          // Generate a token for the user
          // const token = tokenGenerator(user);
          // console.log("Generated JWT token:", token);

          // Save the token to the user's record in the database
          // user.token = token;
          // await user.save()

          // Set the JWT token as a cookie
          // res.cookie('jwt', token, {
          //     httpOnly: true,
          //     sameSite: 'none',
          //     secure: true,
          //     maxAge: 3600000, // 1 hour
          // });

          // Send a response with the token to the user
          return res.status(HttpStatus.OK).json({
              statusCode: HttpStatus.OK,
              data: {
                  message: "Your login was done successfully"
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