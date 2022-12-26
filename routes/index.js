var express = require('express');
var router = express.Router();
const db = require("../models/db");
const mongoose = require("mongoose");
const fs = require("fs");
const user = require("../models/Testmodel");
const task = require("../models/task");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require('path');
passport.use(new LocalStrategy(user.authenticate()));
// mongoose.set('strictQuery', false);

/* GET home page. */
router.get('/', function(req, res, next) {
    user.find().then((user) => {
        res.render("welcome", { user });
    }).catch((err) => {
        res.send(err);
    })

});
router.get('/Login', function(req, res, next) {
    res.render("Login");
});
router.get('/welcome', function(req, res, next) {
    res.render("welcome");
});
router.get('/back', function(req, res, next) {
    res.render("start");
});
router.get('/start', function(req, res, next) {
    res.render("game");
});
router.get('/view/:id', function(req, res, next) {
    console.log("id", req.params.id);
    task.findByIdAndUpdate(req.params.id, req.body).then((tasks) => {
        if (tasks) {
            res.render("hello", { tasks });
        } else {
            console.log("err");
        }
    }).catch((err) => {
        res.send(err);
    })

});
router.get('/newgame', function(req, res, next) {
    task.find().then((tasks) => {
        res.render("index", { tasks });
    }).catch((err) => {
        res.send(err);
    })

});
router.get('/Register', function(req, res, next) {
    res.render("Register");
});
router.get('/forget', function(req, res, next) {
    res.render("forget");
});
router.post('/forget', function(req, res, next) {
    user.findOne(req.body.username).then((userFound) => {
        if (userFound === null) {
            return res.send("User not found");
        }
        userFound.setPassword(req.body.password, function(err, user) {
            userFound.save();
            res.render("login");
        })
    }).catch((err) => {
        res.send("err");
    })
});
router.post('/add', function(req, res, next) {
    const info = req.body;
    console.log(info);
});
router.get('/logout', function(req, res, next) {

    res.render("welcome")


});
router.post('/make', function(req, res, next) {
    const s = fs.writeFileSync(path.join(__dirname, "..", "filesystem"), req.body.filename);
    console.log("file", s);

});
router.post('/result', function(req, res, next) {
    const id = req.params.id;
    const name = req.body.username;
    const desc = req.body.result;
    const index = req.body.index;
    const id_1 = req.body.id_1;
    const id_2 = req.body.id_2;
    const id_3 = req.body.id_3;
    const id_4 = req.body.id_4;
    const id_5 = req.body.id_5;
    const id_6 = req.body.id_6;
    const id_7 = req.body.id_7;
    const id_8 = req.body.id_8;
    const id_9 = req.body.id_9;
    // console.log("index", index)



    task.create({ name, desc, id_1, id_2, id_3, id_4, id_5, id_6, id_7, id_8, id_9 }).then((user) => {
        if (user) {
            res.render("New_game", { username: name });
        } else {
            console.log("not found");
        }
    }).catch((err) => {
        console.log(err);
    })

});
router.post('/game', function(req, res, next) {

    user.findOne({ email: req.body.email }).then((valid) => {
        if (valid) {
            task.find().then((tasks) => {
                res.render("New_game", { username: req.body.username, task });
            }).catch((err) => {
                res.send(err);
            })

        } else {
            var msg = "Enter valid credential's"
            res.render("game", { msg });
        }
    }).catch((err) => {
        console.log(err);
    })

});
router.post('/register', function(req, res, next) {
    const newUser = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
    };
    user.register(newUser, req.body.password).then((u) => {
        var msg = "Congratulations!!! Account created"
        res.render("account", { msg });
    }).catch((err) => {
        res.send(err);
    });

});
router.post('/login', passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/failed",
}), function(req, res, next) {

});
router.get('/profile', function(req, res, next) {
    task.find().then((tasks) => {
        res.render("index", { tasks });
    }).catch((err) => {
        res.send(err);
    })

});


router.get('/failed', function(req, res, next) {
    res.render("loginfailed");

});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
};

module.exports = router;