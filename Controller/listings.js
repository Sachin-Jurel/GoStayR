const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const { location } = req.query;
  let allListings;
  if (location && location.trim() !== "") {
    allListings = await Listing.find({
      location: { $regex: location, $options: "i" },
    });
  } else {
    allListings = await Listing.find({});
  }
  res.render("listings/index.ejs", { allListings });
};

module.exports.new = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listingData = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  res.render("listings/show.ejs", { listingData });
};

module.exports.create = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing created!");
  res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listingData = await Listing.findById(id);
  res.render("listings/edit.ejs", { listingData });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
