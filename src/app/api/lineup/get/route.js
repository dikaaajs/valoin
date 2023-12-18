import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Lineup from "../../../../../models/lineup";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    await connectMongoDB();
    const { agent, map, status, idMaker } = await request.json();

    const pipeline = [
      {
        $match: {
          $or: [
            { agent: agent },
            { map: map },
            { status: status },
            { idMaker: new mongoose.Types.ObjectId(idMaker) },
          ],
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "idMaker",
          foreignField: "_id",
          as: "userInfo",
        },
      },

      {
        $project: {
          agent: 1,
          status: 1,
          ability: 1,
          map: 1,
          coordinat: 1,
          judul: 1,
          keterangan: 1,
          tag: 1,
          imgAndDes: 1,
          linkVideo: 1,
          idMaker: 1,
          like: 1,
          userInfo: { username: 1, pp: 1 },
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ];

    // Lakukan Aggregation
    const result = await Lineup.aggregate(pipeline);
    const response = result.map((i) => {
      return {
        ...i,
        userInfo: i.userInfo[0],
      };
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
