import mongoose, { Schema, models } from "mongoose";

const statsSchema = new Schema(
  {
    lineupDibuat: {
      type: Number,
      required: true,
    },
    lineupTerpilih: {
      type: Number,
      required: true,
    },
    disukai: {
      type: Number,
      required: true,
    },
    idUser: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Stats = models.Stats || mongoose.model("Stats", statsSchema);
export default Stats;
