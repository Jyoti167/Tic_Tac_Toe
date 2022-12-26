const mongoose = require("mongoose");
const pln = require("passport-local-mongoose");

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    uername: String,
    email: String,
    password: String,
});
const loginSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    uername: String,
    email: String,
    password: String,
});

registerSchema.plugin(pln);
const user = mongoose.model("register", registerSchema);


module.exports = user;