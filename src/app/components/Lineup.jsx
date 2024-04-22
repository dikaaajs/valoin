import Post from "@/app/components/Post";

export default function Lineup({ lineup, clientUsername, clientId }) {
  return (
    <>
      {lineup.map((post, idx) => {
        return (
          <Post
            post={post}
            clientUsername={clientUsername}
            clientId={clientId}
            key={idx}
          />
        );
      })}
    </>
  );
}
