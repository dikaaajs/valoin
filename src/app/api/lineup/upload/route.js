import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Lineup from "../../../../../models/lineup";

export async function POST(request) {
  try {
    const {
      agent,
      ability,
      status,
      map,
      coordinat,
      judul,
      keterangan,
      tag,
      imgAndDes,
      linkVideo,
      idMaker,
    } = await request.json();
    console.log(ability);
    await connectMongoDB();

    const lineup = await Lineup.create({
      agent,
      ability,
      map,
      status,
      judul,
      keterangan,
      tag,
      coordinat,
      imgAndDes,
      linkVideo,
      idMaker,
    });

    return NextResponse.json(
      { message: "Lineup registered." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
