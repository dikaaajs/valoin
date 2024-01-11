import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Lineup from "../../../../../models/lineup";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    await connectMongoDB();
    const { agent, map, status, idMaker, page, viewProfile } = await request.json();

    const itemPerPage = 8;
    const skip = (page - 1) * itemPerPage;

    const pipeline = [
      {
        $match: {
          $or: [
            { agent: agent, map: map, status: status },
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
    const tmp = await Lineup.aggregate(pipeline);


    const response = tmp.map((i) => {
      return {
        ...i,
        userInfo: i.userInfo[0],
      };
    });

    const result = response.slice(skip, itemPerPage)
    const count = response.length

    if(viewProfile){
      let likeCount = 0
      response.forEach((i) => {
        likeCount += i.like.length
      })      
    }


    return NextResponse.json({result, count, likeCount}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
