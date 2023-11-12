import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Lineup from "../../../../../models/lineup";

export async function POST(request) {
  try {
    await connectMongoDB();
    const { idMaker } = await request.json();
    const lineup = await Lineup.find({ idMaker });
    return NextResponse.json(lineup);
  } catch (error) {
    console.log(error.message);
  }
}
