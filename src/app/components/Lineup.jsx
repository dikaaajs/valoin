import { useEffect, useState } from "react";
import axios from "axios";
import Post from "@/app/components/Post";

export default function Lineup(props) {
  const { lineup, clientUsername } = props;
  const [uid, setUid] = useState();

  const getData = async () => {
    const user = await axios.post("/api/user/getId", {
      username: props.clientUsername,
    });
    setUid(user.data.userId);
  };

  useEffect(() => {
    getData();
  }, []);

  if (uid === undefined) return <div>loading ...</div>;

  return (
    <>
      {lineup.result.map((e, idx) => {
        const post = {
          ...e,
          imageUrl: e.imgAndDes[2].img3,
        };
        return (
          <Post
            post={post}
            clientUsername={clientUsername}
            key={idx}
            likeCount={post.like.length}
            uid={uid}
          />
        );
      })}
    </>
  );
}
