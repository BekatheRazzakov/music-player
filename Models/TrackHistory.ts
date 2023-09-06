import { Schema, Types, model, Date } from "mongoose";

const TrackHistorySchema = new Schema({
  user: {
    type: Types.ObjectId,
    required: true
  },
  track: {
    type: Types.ObjectId,
    required: true
  },
  datetime: {
    type: Date,
    required: true
  }
});

const TrackHistory = model('TrackHistory', TrackHistorySchema);
export default TrackHistory;