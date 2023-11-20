import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Lineup from "../../../../../models/lineup";

export async function POST(request) {
  try {
    await connectMongoDB();
    const { agent, map, status } = await request.json();
    const lineup = await Lineup.find({ agent, map, status });
    return NextResponse.json(lineup, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
