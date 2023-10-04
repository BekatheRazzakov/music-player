import mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  album: {
    type: mongoose.Types.ObjectId,
    ref: "Album",
    required: true,
  },
  duration: String,
  trackNumber: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Track = mongoose.model("Track", trackSchema);
export default Track;
