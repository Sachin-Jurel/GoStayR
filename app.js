if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const MongoStore = require('connect-mongo');

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.engine("ejs", engine);
app.use(express.static("public"));

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const user = require("./models/user.js");

const dbUrl = process.env.ATLASDB_URL;
const secret = process.env.SESSION_SECRET;


async function main() {
  try {
    await mongoose.connect(dbUrl, {
      serverSelectionTimeoutMS: 5000, 
      socketTimeoutMS: 45000, 
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    console.log("💡 Make sure MongoDB is running locally or set ATLASDB_URL in .env file");
    process.exit(1);
  }
}

main();

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: secret,
  },
  touchAfter: 24*3600
})

const sessionOptions = {
  store,
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

store.on("error", ()=>{
  console.log("error in mongo session", error)
})

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: 'Something went wrong!' });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
