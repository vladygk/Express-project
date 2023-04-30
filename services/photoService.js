const Photo = require("../models/Photo");

exports.create = (bodyData, ownerId) => {
  Photo.create({ ...bodyData, owner: ownerId });
};

exports.findAll = () => Photo.find({});

exports.findOne = (photoId) => Photo.findById(photoId);

exports.edit = (photoId, newData) => Photo.findByIdAndUpdate(photoId,newData);
    


exports.comment = async (userId, photoId, commentText,author) => {
  const photo = await Photo.findById( photoId );

  photo.commentList.push({ userID: userId,author:author, comment: commentText });
  await photo.save();
};


exports.delete = async(photoId)=>Photo.findByIdAndDelete(photoId);
