import connectMongoDB from "../../../../libs/mongodb";
import { NextResponse } from "next/server";

export async function POST() {
  await connectMongoDB();
}

export async function GET() {
  console.log("api jalan");
  await connectMongoDB();
  return NextResponse.json({ message: "Hello from Next.js!" }, { status: 200 });
}
