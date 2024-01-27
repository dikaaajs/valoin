export const dynamic = "force-dynamic";
import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Stats from "../../../../../models/stats";

export async function GET(req) {
  try {
    await connectMongoDB("");
    const idUser = req.nextUrl.searchParams.get("idUser");
    const stats = await Stats.findOne({ idUser });
    return NextResponse.json({ stats }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
