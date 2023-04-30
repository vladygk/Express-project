const router = require("express").Router();
const authService = require("../services/authService");
const { isAuth } = require("../middlewares/authMiddleware");
const {getErrorMessage} = require('../errorParser');
router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  const { username, email, password, repassword } = req.body;
  try {
    const token = await authService.register(
      username,
      email,
      password,
      repassword
    );

    res.cookie("auth", token);
    res.redirect("/");
  } catch (error) {
    return res.status(400).render("auth/register", { error: getErrorMessage(error) });
  }
 
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const token = await authService.login(username, password);
    res.cookie("auth", token);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(404).render("auth/login", { error: getErrorMessage(error) });
  }
});

router.get("/logout", isAuth, (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = router;
