const bcrypt = require("bcrypt");

function hashString(str){
    const salt = bcrypt.genSaltSync(10);
    console.log("Password:", str);
    console.log("Salt:", salt);
    return bcrypt.hashSync(str, salt)
}

module.exports = {
    hashString
}