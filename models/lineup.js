import mongoose, { Schema, Types, models } from "mongoose";

const lineupSchema = new Schema(
  {
    agent: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    ability: {
      type: Number,
      required: true,
    },
    map: {
      type: String,
      required: true,
    },
    coordinat: {
      type: Array,
      required: true,
    },
    judul: {
      type: String,
      required: true,
    },
    keterangan: {
      type: String,
      required: true,
    },
    tag: {
      type: Array,
      required: true,
    },
    imgAndDes: {
      type: Array,
      required: true,
    },
    linkVideo: {
      type: String,
      required: true,
    },
    idMaker: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    like: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Lineup = models.Lineup || mongoose.model("Lineup", lineupSchema);
export default Lineup;
