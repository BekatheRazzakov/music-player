import mongoose from "mongoose";
import Artist from "./Artist";

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await Artist.findById(value),
      message: 'There is no such an artist'
    }
  },
  releaseYear: {
    type: String,
    required: true,
  },
  albumCover: String,
});

const Album = mongoose.model('Album', albumSchema);
export default Album;