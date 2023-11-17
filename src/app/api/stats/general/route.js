export const dynamic = "static";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Lineup from "../../../../../models/lineup";
import User from "../../../../../models/user";

export async function GET(req) {
  try {
    await connectMongoDB();
    const lineupCount = await Lineup.count();
    const userCount = await User.count();
    const versi = "v1.0.0";

    return NextResponse.json({ lineupCount, userCount, versi });
  } catch (error) {
    console.log(error);
  }
}
