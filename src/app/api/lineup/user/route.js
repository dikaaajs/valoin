import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Lineup from "../../../../../models/lineup";
import User from "../../../../../models/user";

export async function POST(request) {
  try {
    await connectMongoDB();
    const { idMaker } = await request.json();
    const lineup = await Lineup.find({ idMaker });
    const userInfo = await User.findById(idMaker, "pp username");
    const updatedLineup = lineup.map((item) => ({
      ...item.toObject(),
      userInfo,
    }));
    return NextResponse.json(updatedLineup, { status: 200 });
  } catch (error) {
    console.log(error.message);
  }
}
