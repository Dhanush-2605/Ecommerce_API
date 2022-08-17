const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(401).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("you are not authenticated!");
  }
};

const verifyTokenAndAuthorisation = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Not Authorized");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user!=null){
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to do that!");
    }
  }
  });

};
module.exports = {
  verifyToken,
  verifyTokenAndAuthorisation,
  verifyTokenAndAdmin,
};
