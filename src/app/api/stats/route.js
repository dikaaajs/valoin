export const dynamic = "static";
import connectMongoDB from "../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Stats from "../../../../models/stats";

export async function POST(req) {
  try {
    await connectMongoDB("auth");
    const { idUser } = await req.json();
    const stats = await Stats.findOne({ idUser });
    return NextResponse.json({ stats });
  } catch (error) {
    console.log(error);
  }
}
