class AuthChecker {
    requireAuth(req, res, next) {
        if (req.session?.user) {
            next();
        } else {
            alert("You already logined!");
            res.json({message: "user already logined" });
        }
    }
    requireGuest(req, res, next) {
        if (!req.session?.user) {
            next();
        } else {
            alert("You not authorized!")
            res.json({ message: "user not authorized" });
        }
      }
}

module.exports = new AuthChecker();