const User = require("../models/user.js");

module.exports.renderSignUpForm = (req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.signUp = async (req, res)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registerUser = await User.register(newUser, password);
        req.login(registerUser, (err)=>{
            if(err){ 
                return next(err);
            }
            req.flash("success", "welcome to GoStayR");
            return res.redirect("/listings");
        })
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup")
    }
}

module.exports.renderLogInForm = (req,res)=>{
    res.render("user/login.ejs");
}

module.exports.logInForm = async (req,res)=>{
    req.flash("success", "Welcome to GoStayR!");
    res.redirect("/listings")
}

module.exports.logOut = (req,res)=>{
    req.logOut ((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    })
}