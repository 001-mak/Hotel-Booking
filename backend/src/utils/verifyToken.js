import jwt from "jsonwebtoken";

export const verfiyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).send("Authorization error");

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) return res.status(403).send("Invalid Token");
    req.user = payload;
    next();
  });
};

export const verifyUser = () => {
    verfiyToken((req,res,next)=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }
        if(err) return res.status(403).send("Not Authorized")

    })
};

export const verifyAdmin = () => {
    verfiyToken((req,res,next)=>{
        if(req.user.isAdmin){
            next()
        }
        if(err) return res.status(403).send("Not Authorized")

    })
};