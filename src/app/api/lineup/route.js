import connectMongoDB from "../../../../libs/mongodb";
import { NextResponse } from "next/server";

export async function POST() {
  await connectMongoDB();
}

export async function GET(req) {}
