// importing the required modules
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const passport = require("passport");
const methodOverride = require("method-override");


// importing and setting up the .env file
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({path: "config.env"});

// using the express module as a `app` variable
const app = express();


// Setting up the Sessions for the app
app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DB_CONNECT_URI,
    collectionName: "sessions"
  }),
  cookie: { maxAge: 3 * 60 * 60 * 1000 } //the cookie expires in three hour
}));


// Setting up the Passport module for login purpose
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");


// Setting up express middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));


// Set the view engine to EJS
app.use(expressLayouts);
app.set('layout', 'layouts/indexLayout');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Client/views'));


// Setting up static files path
app.use(express.static(path.join(__dirname, 'Client/public')));
// populating and serving static files
app.use("/css", express.static(path.join(__dirname, 'Client/public/assets/css')));
app.use("/js", express.static(path.join(__dirname, 'Client/public/assets/js')));
app.use("/img", express.static(path.join(__dirname, 'Client/public/assets/img')));


// Setting up the Routers in specific orders
app.use('/', require('./Server/routes/auth'));
app.use('/', require('./Server/routes/dashboardRouter'));
app.use('/', require('./Server/routes/mainRouter'));


// listening to the server at specified port either from the .env or default(8080)
const PORT = process.env.PORT || 8080;

// connecting to the Database and starting the sever
mongoose.connect(process.env.DB_CONNECT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("Connected to DB...")
  app.listen(PORT, () => {
    console.log(`Server up and is running at http://localhost:${PORT}`);
  })
});