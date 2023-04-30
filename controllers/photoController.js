const router = require("express").Router();
const photoService = require("../services/photoService");
const { getErrorMessage } = require("../errorParser");
const { isAuth } = require("../middlewares/authMiddleware");
const User = require("../models/User");

router.get("/create", (req, res) => {
  res.render("photo/create");
});

router.post("/create", async (req, res) => {
  const bodyData = req.body;

  try {
     photoService.create(bodyData, req.user._id);
     res.redirect("/photo/catalog");
  } catch (error) {
    console.log("here");
    return res
      .status(400)
      .render("home/404", { error: getErrorMessage(error) });
  }
});

router.get("/catalog", async (req, res) => {
  try{
  const photos = await photoService.findAll().populate("owner").lean();
  res.render("photo/catalog", { photos });
  }
  catch (error) {
    return res
      .status(400)
      .render("/home/404", { error: getErrorMessage(error) });
  }
});

router.get("/:photoId/details", async (req, res) => {
try{
  const photo = await photoService
    .findOne(req.params.photoId)
    .populate("owner")
    .lean();
  const comments = await photoService
    .findOne(req.params.photoId)
    .populate({ path: "commentList.userID", model: "User" })
    .populate()
    .lean();
  const isOwner = photo.owner._id.toString() === req.user?._id;
  const canComment = req.user !== undefined && !isOwner;
  res.render("photo/details", { photo, isOwner, canComment });
}catch (error) {
  return res
    .status(400)
    .render("home/404", { error: getErrorMessage(error) });
}
});

router.get("/:photoId/edit",isAuth, async (req, res) => {
  try{
  const photo = await photoService.findOne(req.params.photoId).lean();
  res.render("photo/edit", { photo });
  }
  catch (error) {
    return res
      .status(400)
      .render("home/404", { error: getErrorMessage(error) });
  }
});

router.post("/:photoId/edit", isAuth, async (req, res) => {
  const updatedData = req.body;
  const id = req.params.photoId;
  try {
    await photoService.edit(id,updatedData);
  } catch (error) {
    return res
      .status(400)
      .render("photo/catalog", { error: getErrorMessage(error) });
  }

  res.redirect(`/photo/${req.params.photoId}/details`);
});

router.post("/:photoId/comments", isAuth, async (req, res) => {
  const { commentText } = req.body;
  const author = req.user.username;
  try {
    await photoService.comment(
      req.user._id,
      req.params.photoId,
      commentText,
      author
    );
  } catch (error) {
    return res
      .status(400)
      .render("photo/catalog", { error: getErrorMessage(error) });
  }

  res.redirect(`/photo/${req.params.photoId}/details`);
});


router.get("/:photoId/delete",isAuth,async(req,res)=>{
  try{
await photoService.delete(req.params.photoId)
res.redirect("/photo/catalog");
  }
  catch (error) {
    return res
      .status(400)
      .render("photo/catalog", { error: getErrorMessage(error) });
  } 
});



module.exports = router;
