import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Lineup from "../../../../../models/lineup";

export async function POST(request) {
  try {
    await connectMongoDB();
    const { agent, map } = await request.json();
    console.log(agent);
    const lineup = await Lineup.find({ agent, map });
    return NextResponse.json(lineup);
  } catch (error) {
    console.log(error.message);
  }
}
