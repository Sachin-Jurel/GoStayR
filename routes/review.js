const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const {isLoggedIn, isAuthor} = require("../middleware.js");
const reviewController = require("../Controller/reviews.js")

// review route
router.post("/", isLoggedIn, reviewController.createReviews);

// Delete reviews
router.delete("/:reviewId",isLoggedIn, isAuthor, reviewController.deleteReviews);

module.exports = router; 