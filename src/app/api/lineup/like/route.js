import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Lineup from "../../../../../models/lineup";

export async function POST(req) {
  const { idUser, idLineup } = await req.json();
  await connectMongoDB();

  try {
    // Periksa apakah user sudah like postingan ini
    const lineup = await Lineup.findById(idLineup);

    if (lineup === null) {
      return { status: 404, body: { error: "Lineup not found." } };
    }

    const userIndex = lineup.like.indexOf(idUser);
    if (userIndex !== -1) {
      lineup.like.splice(userIndex, 1);
      await lineup.save();
      return NextResponse.json({ type: "unlike" }, { status: 200 });
    } else {
      lineup.like.push(idUser);
      await lineup.save();
      return NextResponse.json({ type: "like" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  const idLineup = req.nextUrl.searchParams.get("idLineup");
  await connectMongoDB();
  try {
    const lineup = await Lineup.findById(idLineup);
    return NextRequest.json({ msg: "berhasil" });
  } catch (error) {
    console.log(error.message);
    return NextRequest.json({ msg: error.message });
  }
}
