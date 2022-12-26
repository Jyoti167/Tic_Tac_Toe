const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/Register").then(() => {
    console.log("connected");
}).catch((err) => {
    console.log("not connected");
})