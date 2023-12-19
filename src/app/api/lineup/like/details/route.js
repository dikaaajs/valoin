export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../../libs/mongodb";
import Lineup from "../../../../../../models/lineup";
import User from "../../../../../../models/user";

export async function GET(req) {
  const idLineup = req.nextUrl.searchParams.get("idLineup");
  await connectMongoDB();
  try {
    const lineup = await Lineup.findById(idLineup);
    const users = lineup.like;
    const usersData = await User.find({ _id: { $in: users } }).select(
      "username pp"
    );
    return NextResponse.json({ usersData }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
