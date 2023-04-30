const router = require("express").Router();
const homeController = require("./controllers/homeController");
const authConroller = require("./controllers/authController");
const photoController = require('./controllers/photoController');
const profileController = require('./controllers/profileController');

router.use(homeController);
router.use(authConroller);
router.use(profileController);
router.use('/photo',photoController);
module.exports = router;

