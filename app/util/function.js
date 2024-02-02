const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const {UserModel} = require("../model/user");
const {ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY} = require("./constant");

function SignAccessToken(userId){
    return new Promise(async(resolve, reject) => {
        const user = await UserModel.findById(userId);
        const payload = {

            username : user.username
        };

        const options = {
            expiresIn : "1h"
        };

        JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
            if(err) reject(createError(500, "server side error"));
            resolve(token);
        })
    })
}


function SignRefreshToken(userId){
    return new Promise(async(resolve, reject) => {
        const user = await UserModel.findById(userId);
        const payload = {

            username : user.username
        };

        const options = {
            expiresIn : "1y"
        };

        JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, (err, token) => {
            if(err) reject(createError(500, "Server side error"));
            resolve(token);
        })
    })
}

function VerifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) reject(createError(401, "Please log into your account"))
            // console.log(payload, err);
            const {username} = payload || {};
            const user = await UserModel.findOne({username}, {password: 0, token: 0});
            if (!user) reject(createError(401, "The user account was not found"))
            resolve(username);
        })
    })
}
module.exports = {
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken
}