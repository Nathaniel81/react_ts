import PostFeed from '../PostFeed'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  AppDispatch, RootState } from '@/redux/store'
// import { fetchPosts } from '@/redux/slices/subredditPostsSlice'
// import { fetchSubreddit } from '@/redux/slices/subredditDetailSlice'
import { fetchPosts } from '@/redux/slices/postsListSlice'


const Feed = () => {
	// const subredditDetail = useSelector((state: RootState) => state.subredditDetail);
    // const { subreddit } = subredditDetail;

    const postsList = useSelector((state: RootState) => state.postsList);
    const { posts } = postsList;

    const dispatch = useDispatch<AppDispatch>();
    // // const { slug } = useParams();
    // const subredditName = 'test_room11'; 

  
    useEffect(() => {
        if (posts.length === 0) {
          dispatch(fetchPosts())
        }
      },[dispatch, posts])


  return <PostFeed posts={posts} />
}

export default Feed
