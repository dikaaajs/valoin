import Post from "@/app/components/Post";


export default function Lineup(props) {
	const {lineup, clientUsername} = props

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
                />
              );
            })}
    </>
	)
}