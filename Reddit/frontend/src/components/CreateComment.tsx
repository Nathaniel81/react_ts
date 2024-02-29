import { Button } from '@/components/ui/Button'
import { toast } from '@/hooks/use-toast'
import { CommentRequest } from '@/lib/validators/comment'
import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { FC, useState } from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { useSelector, useDispatch } from 'react-redux';
import {  AppDispatch, RootState } from '@/redux/store'
import { fetchPostDetails } from '@/redux/slices/postDetailSlice';


interface CreateCommentProps {
  postId: string
  replyToId?: string
}

const CreateComment: FC<CreateCommentProps> = ({ postId, replyToId }) => {
  const postDetails = useSelector((state: RootState) => state.postDetail);
  const { post } = postDetails;

  const dispatch = useDispatch<AppDispatch>();
  const [input, setInput] = useState<string>('');
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  const { mutate: comment, isLoading } = useMutation({
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

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
        return toast({
            title: 'Unauthorized',
            description: 'Please Login.',
            variant: 'destructive',
          });
        }
      }

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

  return (
    <div className='grid w-full gap-1.5'>
      <Label htmlFor='comment'>Your comment</Label>
      <div className='mt-2'>
        <Textarea
          id='comment'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder='What are your thoughts?'
        />

        <div className='mt-2 flex justify-end'>
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => comment({ postId, content: input, replyToId })}>
            Post
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateComment
