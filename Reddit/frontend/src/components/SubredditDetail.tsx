import { useParams } from 'react-router-dom';
import MiniCreatePost from '@/components/MiniCreatePost';
import PostFeed from './PostFeed';


const SubredditDetail = () => {
  const { slug } = useParams();

  return (
	<>
		<h1 className='font-bold text-3xl md:text-4xl h-14'>
			r/{slug}
		</h1>
		<MiniCreatePost />
		{/* <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name} /> */}
		<PostFeed />

	</>
	
  )
}

export default SubredditDetail;
