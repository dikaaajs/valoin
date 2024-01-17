import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Lineup from "../../../../../models/lineup";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    await connectMongoDB();
    let { agent, map, status, idMaker, page, viewProfile } =
      await request.json();

    page = page === undefined ? 1 : page;
    viewProfile = viewProfile === undefined ? false : viewProfile;

    const itemPerPage = 8;
    const itemEnd = itemPerPage * page;
    const itemStart = (page - 1) * itemPerPage;

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

    const response = tmp
      .map((i) => {
        return {
          ...i,
          userInfo: i.userInfo[0],
        };
      })
      .slice(itemStart, itemEnd);

    const count = response.length;
    let likeCount = 0;
    let verifyCount = 0;

    if (viewProfile) {
      tmp.forEach((i) => {
        likeCount += i.like.length;
        if (i.tag.includes("verify")) {
          verifyCount += 1;
        }
      });
    }

    return NextResponse.json(
      { result: response, count, likeCount, verifyCount },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
