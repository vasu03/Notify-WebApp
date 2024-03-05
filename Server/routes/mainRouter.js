const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

// Route to the homepage of app -> index.html
router.get('/', mainController.homepage);
// // Route to the homepage of app -> loginPage.html
// router.get('/loginPage', mainController.loginPage);
// // Router to handle login form submission
// router.post('/login', mainController.login); 
// Route to the about page of app -> about.html
router.get('/about',mainController.about);
// Route to the explore page of app -> about.html
router.get('/explore',mainController.explore);
// Route to Error-404 Page of app -> error404.html
router.get("*", mainController.error404);

module.exports = router;