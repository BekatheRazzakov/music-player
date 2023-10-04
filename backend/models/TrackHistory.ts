import { model, Schema, Types } from "mongoose";

const TrackHistorySchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  track: {
    type: Types.ObjectId,
    ref: "Track",
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
});

const TrackHistory = model("TrackHistory", TrackHistorySchema);
export default TrackHistory;
