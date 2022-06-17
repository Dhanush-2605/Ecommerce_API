// const jwt = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(401).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("you are not authenticated!");
  }
};

const verifyTokenAndAuthorisation = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.isAdmin);
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to do that!");
    }
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAuthorisation,
  verifyTokenAndAdmin,
};

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTQ4MTVmMTJlYjc2ZjEwMjAzNjdiYSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTQ5NDgzMTAsImV4cCI6MTY1NTIwNzUxMH0.GFONbYfY4GS_CG-YqYE5ByD0KOjPXH-qi5ShoQghId8
