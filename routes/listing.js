const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const ListingController= require("../Controller/listings.js")
const multer  = require('multer')
const {storage} = require('../cloudConfig.js')
const upload = multer({ storage })

router
    .route("/")
    .get(ListingController.index)
    .post(isLoggedIn, upload.single('listing[image]'), ListingController.create);
 
// new route
router.get("/new", isLoggedIn, ListingController.new);


router
    .route("/:id")
    .get(ListingController.showListing)
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), ListingController.updateListing)
    .delete(isLoggedIn, isOwner,  ListingController.deleteListing);

// Edit route
router.get("/:id/edit", isLoggedIn, isOwner,  ListingController.editListing);

module.exports = router;