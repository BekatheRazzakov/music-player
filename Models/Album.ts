import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  releaseYear: {
    type: String,
    required: true,
  },
  albumCover: String,
});

const Album = mongoose.model('Album', albumSchema);
export default Album;