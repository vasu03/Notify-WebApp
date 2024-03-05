// chechking if the user is already logged in or not...
// if the user is logged in then only can access the dashboard page otherwise not
exports.isLoggedIn = function (req, res, next) {
    if(req.user) {
      next();
    } else {
      return res.status(401).send('Access Denied');
    }
  }