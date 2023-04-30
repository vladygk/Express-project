const router = require("express").Router();
const User = require('../models/User');
const Photo = require('../models/Photo');
const { getErrorMessage } = require("../errorParser");
const { isAuth } = require("../middlewares/authMiddleware");
router.get('/profile',isAuth,async (req,res)=>{
try{
    const user = await User.findById(req.user._id).lean();
    const photos = await Photo.find({owner:req.user._id}).lean();
    res.render('home/profile',{user:user,photos:photos})

}catch(error){
    return res
    .status(400)
    .render("/404", { error: getErrorMessage(error) });
}


    
})


module.exports = router;