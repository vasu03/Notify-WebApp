// Importing the Required Modules to work on
const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// Route to Dashboard page of app...
router.get('/dashboard', dashboardController.dashboard);
// Route to viewNotes when any any note is clicked...
router.get('/dashboard/item/:id', dashboardController.dashboardViewNote);
// Route to update specific note...
router.put('/dashboard/item/:id', dashboardController.dashboardUpdateNote);
// Route to delete a specific note...
router.delete('/dashboard/item-delete/:id', dashboardController.dashboardDeleteNote);
// Route to add a new note...
router.get('/addNote', dashboardController.dashboardAddNote);
router.post('/addNote', dashboardController.dashboardSubmitNote);

module.exports = router;