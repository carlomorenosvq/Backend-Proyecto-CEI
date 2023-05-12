function logout(req, res) {
    if (req.session.loggedin) {
      req.session.destroy();
      res.clearCookie('userRegistered');
        
        res.clearCookie('email');
        res.clearCookie('password');
        res.clear();
    }
    res.redirect("/");
  }
module.exports = logout;