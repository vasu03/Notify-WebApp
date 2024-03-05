// Importing the Required Modules to work on
const notes = require("../models/notes");
const Note = require("../models/notes");
const mongoose = require("mongoose");


/* = = = = = = = Function for rendering dashboard page of app = = = = = = = */ 
exports.dashboard = async (req, res) => {  
  const userName = req.user ? req.user.firstName : null;
  const profilePic = req.user ? req.user.profileImage : null;
  const userEmail = req.user ? req.user.googleMail : null;
  const userID = req.user ? req.user.id : null;
  
  /* - - - - - Pagination of Dashboard page - - - - - */
  let perPage = 12;                 // only 12 notes will be served on single page
  let page = req.query.page || 1;   // defining a variable to keep track of diff pages
  
  try {
    const notes = await Note.aggregate([
      { $sort: { createdAt: -1 } },                                   // sorting as per the newest notes first
      { $match: { user: new mongoose.Types.ObjectId(userID) } },     // show notes of specific user.
      {
        $project: {
          title: { $substr: ["$title", 0, 23] },                    // only 25 chars to be shown in title of Note-card
          body: { $substr: ["$body", 0, 120] },                     // only 100 chars to be shown in body of Note-card
        },
      },
    ]).skip(perPage * page - perPage).limit(perPage).exec();

    const count = await Note.countDocuments(); 

    // Check if there are notes available on the next page
    const nextNotes = await Note.find({
      user: new mongoose.Types.ObjectId(userID),
    })
      .skip(perPage * (parseInt(page) + 1) - perPage)
      .limit(perPage)
      .lean();
    const notesOnNextPage = nextNotes.length > 0;

    // Check if there are notes available on each page
    const notesOnPage = [];
    for (let i = 1; i <= Math.ceil(count / perPage); i++) {
      const pageNotes = await Note.find({
        user: new mongoose.Types.ObjectId(userID),
      })
        .skip(perPage * i - perPage)
        .limit(perPage)
        .lean();
      notesOnPage.push(pageNotes.length > 0);
    }

    // Actual rendering of dashboard page of app
    res.render("dashboard", {
      userName: userName,
      userEmail: userEmail,
      profilePic: profilePic,
      notes,
      current: page,
      pages: Math.ceil(count / perPage),
      notesOnNextPage,
      notesOnPage,
      layout: 'layouts/dashboardLayout'
    });

  } catch (error) {
    console.log(error);
  }
};


/* = = = = = = = Function for rendering view-notes page of app = = = = = = = */
exports.dashboardViewNote = async (req, res) => {
  // Getting a specific note having id for the specific user
  const note = await Note.findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean();

  if (note) {
    res.render("viewNotes", {
      noteID: req.params.id,
      note,
      layout: 'layouts/viewNotesLayout'
    });
  } else {
    res.send("Something went wrong.");
  }
};


/* = = = = = = = Function for updating the Notes = = = = = = = */
exports.dashboardUpdateNote = async(req, res)=>{
  // find the specific note to update for a specific user
  try{
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body }
    ).where({ user: req.user.id });

    res.redirect("/dashboard");
  }catch(error){
    console.log(error);
  }
}


/* = = = = = = = Function for Deleting the Notes = = = = = = = */
exports.dashboardDeleteNote = async(req, res)=>{ 
  try{
    await Note.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
    res.redirect("/dashboard");
  }catch(error){
    console.log(error);
  }
}

/* = = = = = = = Function for Adding a new note = = = = = = = */
exports.dashboardAddNote = async(req, res)=>{
  try {
    res.render("addNote", {
      layout: "layouts/viewNotesLayout"
    });
  } catch (error) {
    console.log(error);
  }
}

exports.dashboardSubmitNote = async(req, res)=>{
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
}