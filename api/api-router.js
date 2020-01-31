const router = require("express").Router();
const authRouter = require("../auth/auth-router");
const jokesRouter = require("../jokes/jokes-router");

router.use("/auth", authRouter);
router.use("/jokes", jokesRouter);
router.get("/", () => {
  resizeBy.json({
    api: "There are many jokes here"
  });
});

module.exports = router;
