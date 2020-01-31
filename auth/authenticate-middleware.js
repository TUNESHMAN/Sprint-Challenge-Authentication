/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const bcrypt = require("bcryptjs");
const Jokes = require("../jokes/jokes-model");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (token) {
    // verify is it valid?
    // it's made by us (was made using the secret)
    // the token hasn't expired
    // hasn't been tampered with etc
    jwt.verify(
      token,
      process.env.JWT_SECRET || "topsecret",
      //callback (err,decodedToken)
      (err, decoded) => {
        if (err) {
          res.status(401).json({
            message: "token is bad"
          });
        } else {
          //  put the decoded token on req
          req.decodedToken = decoded;
          next();
        }
      }
    );
  } else{
    res.status(400).json({ message: "No credentials provided" });
  }
};
