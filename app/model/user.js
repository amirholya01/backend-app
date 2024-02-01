const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username : {type : String, lowercase : true, required: true},
    email : {type : String, lowercase : true, required: true, unique: true},
    password : {type : String, required: true},
    role : {type : String, default : "USER"},
    Courses : {type: [], default : []},
    Products : {type: [], default : []},
    // basket: {type: {}}
})

module.exports = {
    UserModel : mongoose.model("user", UserSchema)
}