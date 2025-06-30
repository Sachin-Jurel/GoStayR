const Listing = require("./models/listing");
const review = require("./models/review");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error", "Firstly, you must be logged in");
        return res.redirect("/login");
    }
    next();
}

module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "you don't have permission to edit")
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isAuthor = async (req,res,next)=>{
    let {id, reviewId} = req.params;
    let Review = await review.findById(reviewId);
    if(!Review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "you don't have permission to delete")
        return res.redirect(`/listings/${id}`);
    }
    next();
}