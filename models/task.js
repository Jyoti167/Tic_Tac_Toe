const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema({
    name: String,
    desc: String,
    date: {
        type: Date,
        default: Date.now,
    },
    id_1: String,
    id_2: String,
    id_3: String,
    id_4: String,
    id_5: String,
    id_6: String,
    id_7: String,
    id_8: String,
    id_9: String,

});
const task = mongoose.model("result", gameSchema);
module.exports = task;