import { Schema, model, Types } from "mongoose";
import Artist from "./Artist";

const albumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await Artist.findById(value),
      message: 'There is no such an artist'
    }
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  albumCover: String,
});

const Album = model('Album', albumSchema);
export default Album;