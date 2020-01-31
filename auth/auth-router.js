const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Jokes = require("../jokes/jokes-model");

// This is a function to create a token
function createToken(joke) {
  // Making a payload object
  const payload = {
    sub: joke.id,
    username: joke.username
  };
  // Making and options object here
  const options = {
    expiresIn: "10h"
  };
  // Using the library to make the token
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET || "topsecret",
    options
  );
  return token;
}
router.post("/register", (req, res) => {
  // implement registration
  let joke = req.body;
  const hash = bcrypt.hashSync(joke.password, 13);
  joke.password = hash;
  Jokes.add(joke)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;

  Jokes.findBy({ username })
    .first()
    .then(joke => {
      if (joke && bcrypt.compareSync(password, joke.password)) {
        const token = createToken(joke);
        res.status(200).json({
          message: `Welcome ${joke.username}! How are you doing today?`,
          token
        });
      } else {
        res.status(401).json({ message: "Your login details are incorrect" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// LOGOUT ENDPOINT COMES HERE
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({
          message: "You are logging out of the site"
        });
      } else {
        res.status(200).json({
          message: "Thanks for coming"
        });
      }
    });
  } else {
    res.status(200).json({
      message: "You are not yet logged in"
    });
  }
});

module.exports = router;
