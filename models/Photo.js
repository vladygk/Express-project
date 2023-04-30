const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  name: {
    type: String,
    minlegth:2,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
        validator: function (v) {
            return v.startsWith('http') || v.startsWith('https');
        },
        message: 'You must provide more than 1 tag.'
    }
  },
  age: {
    type: Number,
    required: true,
    min:1,
    max:100
  },
  description: {
    type: String,
    required: true,
    minlegth:5,
    maxlenght:50
  },
  location: {
    type: String,
    required: true,
    minlegth:5,
    maxlenght:50
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  commentList: [
    {
      userID: { type: String },
      author:{type:String},
      comment: {
        type: String,
      },
    },
  ],
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
