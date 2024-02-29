import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import { formatTimeToNow } from '@/lib/utils'
import { CommentRequest } from '@/lib/validators/comment'
// import { Comment, CommentVote, User } from '@prisma/client'
import { useMutation } from 'react-query'
import axios from 'axios'
import { MessageSquare } from 'lucide-react'
// import { useRouter } from 'next/navigation'
import { FC, useRef, useState } from 'react'
// import CommentVotes from '../CommentVotes'
import { UserAvatar } from '../UserAvatar'
import { Button } from '../ui/Button'
import CommentVotes from '../CommentVotes'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { toast } from '@/hooks/use-toast'
import { useSelector, useDispatch } from 'react-redux';
import {  AppDispatch, RootState } from '@/redux/store'
import { fetchPostDetails } from '@/redux/slices/postDetailSlice';
import { useEffect } from 'react'


type ExtendedComment = Comment & {
  votes: CommentVote[]
  author: User
}

interface PostCommentProps {
  comment: ExtendedComment
  votesAmt: number
  currentVote: CommentVote | undefined
  postId: string
}

const PostComment = ({
  comment,
  votesAmt,
  currentVote,
  postId,
}) => {
    const postDetails = useSelector((state: RootState) => state.postDetail);
    const { post } = postDetails;
  
    const dispatch = useDispatch<AppDispatch>();
    const [input, setInput] = useState<string>('');
    const userLogin = useSelector((state: RootState) => state.userLogin);
    const { userInfo } = userLogin;
//   const { data: session } = useSession()
  const [isReplying, setIsReplying] = useState<boolean>(false)
  const commentRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(commentRef, () => {
    setIsReplying(false)
  })

  const { mutate: postComment, isLoading } = useMutation({
    mutationFn: async ({ postId, content, replyToId }: CommentRequest) => {
      const payload: CommentRequest = { postId, content, replyToId }

      const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo?.access}`
        }
      }

      const { data } = await axios.post(
        `/api/subreddit/post/comment/`,
        payload,
        config
      )
      return data
    },

    onError: () => {
      return toast({
        title: 'Something went wrong.',
        description: "Comment wasn't created successfully. Please try again.",
        variant: 'destructive',
      })
    },
    onSuccess: () => {
        dispatch(fetchPostDetails(post.id))
        setInput('')
      },
  })

  useEffect(() => {
    if (isReplying && comment.parent_comment) {
      setInput(`@${comment.parent_comment.author} `);
    }
  }, [isReplying, comment.parent_comment]);

  return (
    <div ref={commentRef} className='flex flex-col'>
      <div className='flex items-center'>
          <UserAvatar
            user={{
              name: comment.author.name || null,
              image: comment.author.image || null,
            }}
            className='h-6 w-6'
          />
          <div className='ml-2 flex items-center gap-x-2'>
            <p className='text-sm font-medium text-gray-900'>u/{comment.author.email}</p>
  
            <p className='max-h-40 truncate text-xs text-zinc-500'>
              {formatTimeToNow(new Date(comment.created_at))}
            </p>
          </div>
        </div>
        <p className='text-sm text-zinc-900 mt-2'>
          {/* {comment.parent_comment ? `@${comment.parent_comment.author.email} ` : ''} */}
          {comment.content}
        </p>
          <div className='flex gap-2 items-center'>
              <CommentVotes
                commentId={comment.id}
                votesAmt={votesAmt}
                currentVote={currentVote}
              />
    
              <Button
                onClick={() => {
                //   if (!session) return router.push('/sign-in')
                  setIsReplying(true)
                }}
                variant='ghost'
                size='xs'>
                <MessageSquare className='h-4 w-4 mr-1.5' />
                Reply
              </Button>
            </div>

            {isReplying ? (
                <div className='grid w-full gap-1.5'>
                  <Label htmlFor='comment'>Your comment</Label>
                  <div className='mt-2'>
                    <Textarea
                      onFocus={(e) =>
                        e.currentTarget.setSelectionRange(
                          e.currentTarget.value.length,
                          e.currentTarget.value.length
                        )
                      }
                      autoFocus
                      id='comment'
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={1}
                      placeholder='What are your thoughts?'
                    />

                    <div className='mt-2 flex justify-end gap-2'>
                      <Button
                        tabIndex={-1}
                        variant='subtle'
                        onClick={() => setIsReplying(false)}>
                        Cancel
                      </Button>
                      <Button
                        isLoading={isLoading}
                        onClick={() => {
                          if (!input) return
                          postComment({
                            postId,
                            content: input,
                            replyToId: comment.parent_comment?.id ?? comment.id, // default to top-level comment
                          })
                        }}>
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
      ) : null}
    </div>
  )
}

export default PostComment
