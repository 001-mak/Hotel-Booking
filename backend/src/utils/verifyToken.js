import jwt from "jsonwebtoken";
// import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
    return res.status(401).send("Not Token");
  }
  const token = bearerHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.status(403).send("Not Authorized");
    else{
      req.user = user;
      console.log(user)
      next();
    }
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).send("Not Authorized");
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).send("Not Authorized");
    }
  });
};