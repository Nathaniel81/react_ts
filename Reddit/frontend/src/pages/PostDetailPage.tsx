// import CommentsSection from '@/components/CommentsSection'
import { buttonVariants } from '@/components/ui/Button';
import { ArrowBigDown, ArrowBigUp, Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import EditorOutput from '@/components/EditorOutput';
import { formatTimeToNow } from '@/lib/utils';
import PostVoteClient from '@/components/PostVoteClient';
import { useSelector, useDispatch } from 'react-redux';
import {  AppDispatch, RootState } from '@/redux/store'
import { useEffect } from 'react';
import { fetchPostDetails } from '@/redux/slices/postDetailSlice';
import { useParams } from 'react-router-dom';
import { usePrevious } from '@mantine/hooks'



const PostDetailPage = () => {
    const postDetails = useSelector((state: RootState) => state.postDetail);
    const { post } = postDetails;

    const userLogin = useSelector((state: RootState) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch<AppDispatch>();

    const { id } = useParams();
    // const prevVote = usePrevious(currentVote)

    const votesAmt = post?.votes.reduce((acc, vote) => {
        if (vote.type === 'UP') return acc + 1
        if (vote.type === 'DOWN') return acc - 1
        return acc
      }, 0)

      const currentVote = post?.votes.find(
        (vote) => vote.user === userInfo?.id
      )
      const prevVote = usePrevious(currentVote)


      useEffect(() => {
        if(!post || post.id !== id){
            dispatch(fetchPostDetails(id))
        }
      }, [dispatch, id])

  return (
    <div>
        <div className='py-4 h-full flex flex-col sm:flex-row items-center sm:items-start justify-between'>
          <Suspense fallback={<PostVoteShell />}>
            <PostVoteClient
              postId={post?.id}
              initialVotesAmt={votesAmt}
              initialVote={currentVote?.type}
            />
          </Suspense>

        <div className='sm:w-0 w-full flex-1 bg-white p-4 rounded-sm'>
         <p className='max-h-40 mt-1 truncate text-xs text-gray-500'>
           Posted by u/{post?.author.username }{' '}
           {post && formatTimeToNow(new Date(post?.created_at))}
         </p>
         <h1 className='text-xl font-semibold py-2 leading-6 text-gray-900'>
           {post?.title}
         </h1>
     
         <EditorOutput content={post?.content} />
         <Suspense
           fallback={
             <Loader2 className='h-5 w-5 animate-spin text-zinc-500' />
           }>
           {/* <CommentsSection postId={post?.id ?? cachedPost.id} /> */}
         </Suspense>
        </div>
      </div>
    </div>
  );
};

function PostVoteShell() {
    return (
      <div className='flex items-center flex-col pr-6 w-20'>
        {/* upvote */}
        <div className={buttonVariants({ variant: 'ghost' })}>
          <ArrowBigUp className='h-5 w-5 text-zinc-700' />
        </div>
  
        {/* score */}
        <div className='text-center py-2 font-medium text-sm text-zinc-900'>
          <Loader2 className='h-3 w-3 animate-spin' />
        </div>
  
        {/* downvote */}
        <div className={buttonVariants({ variant: 'ghost' })}>
          <ArrowBigDown className='h-5 w-5 text-zinc-700' />
        </div>
      </div>
    )
  }

export default PostDetailPage;
