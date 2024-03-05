exports.homepage = async (req, res) => {
    try {
      const userName = req.user ? req.user.firstName : null;
      const profilePic = req.user ? req.user.profileImage : null;
      const userEmail = req.user ? req.user.googleMail : null;
  
      res.render("index", {
        userName: userName,
        userEmail: userEmail,
        profilePic: profilePic,
        layout: "layouts/indexLayout",
      });
    } catch (error) {
      console.log(error);
    }
  };
    
// Rendering the about.html file on the server
exports.about = async (req, res) => {
  try {
    const userName = req.user ? req.user.firstName : null;
    const profilePic = req.user ? req.user.profileImage : null;
    const userEmail = req.user ? req.user.googleMail : null;

    res.render("about", {
      userName: userName,
      userEmail: userEmail,
      profilePic: profilePic,
      layout: "layouts/aboutLayout",
    });
  } catch (error) {
    console.log(error);
  }
};

// Rendering the about.html file on the server
exports.explore = async (req, res) => {
  try {
    const userName = req.user ? req.user.firstName : null;
    const profilePic = req.user ? req.user.profileImage : null;
    const userEmail = req.user ? req.user.googleMail : null;

    res.render("explore", {
      userName: userName,
      userEmail: userEmail,
      profilePic: profilePic,
      layout: "layouts/exploreLayout",
    });
  } catch (error) {
    console.log(error);
  }
}



// Handling the Error - 404 Page Not found
exports.error404 = async (req, res) => {
    res.render("error404");
}
