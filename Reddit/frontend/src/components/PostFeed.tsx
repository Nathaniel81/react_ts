/*eslint-disable*/
// @ts-nocheck

import Post from './Post'
import { fetchSubreddit } from '@/redux/slices/subredditDetailSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  AppDispatch, RootState } from '@/redux/store'
import { useParams } from 'react-router-dom';
import { fetchPosts } from '@/redux/slices/subredditPostsSlice'


const PostFeed = ({ posts, subredditName }) => {
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

      return (
        <ul className='flex flex-col col-span-2 space-y-6'>
          {posts?.map((post, index) => {

            const votesAmt = post.votes.reduce((acc, vote) => {
              if (vote.type === 'UP') return acc + 1
              if (vote.type === 'DOWN') return acc - 1
              return acc
            }, 0)
    
            const currentVote = post.votes.find(
              (vote) => vote.user === userInfo?.id
            )

            return (
                <li key={post.id}>
                  <Post
                    post={post}
                    commentAmt={post.comments.length}
                    subredditName={post.subreddit.name}
                    votesAmt={votesAmt}
                    currentVote={currentVote}
                  />
                </li>
            )
          })}
        </ul>
      )
    }              


export default PostFeed
