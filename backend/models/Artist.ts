import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  info: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Artist = mongoose.model('Artist', artistSchema);
export default Artist;