const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

})

module.exports = {
    ProductModel : mongoose.model("product", ProductSchema)
}