import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  info: String,
});

const Artist = mongoose.model('Artist', artistSchema);
export default Artist;