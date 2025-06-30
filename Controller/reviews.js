const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReviews = async (req,res)=>{
    let id = req.params.id;
    let listing = await Listing.findById(id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    listing.save();
    newReview.save();
    res.redirect(`/listings/${id}`);
}

module.exports.deleteReviews = async (req,res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}