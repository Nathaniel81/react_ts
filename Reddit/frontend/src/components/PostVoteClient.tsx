
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { usePrevious } from '@mantine/hooks'
import axios, { AxiosError } from 'axios';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useSelector, useDispatch } from 'react-redux'
import {  AppDispatch, RootState } from '@/redux/store'
// import { toast, loginToast } from '@/lib/toast';
import { Button } from '@/components/ui/Button';
import { PostVoteRequest } from '@/lib/validators/vote';
import { fetchPostDetails } from '@/redux/slices/postDetailSlice';
import { fetchPosts } from '@/redux/slices/postsListSlice';

enum VoteType {
    UP = 'UP',
    DOWN = 'DOWN'
  }
  
//   interface PostVoteRequest {
//     voteType: VoteType;
//     postId: string;
//   }

interface PostVoteClientProps {
  postId: string;
  initialVotesAmt: number;
  initialVote?: VoteType | null;
}

const PostVoteClient = ({
  postId,
  initialVotesAmt,
  initialVote,
}: PostVoteClientProps) => {
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const { toast } = useToast();
  const prevVote = usePrevious(currentVote);
  

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch<AppDispatch>();


  

  const { mutate: vote } = useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: PostVoteRequest = {
        voteType: type,
        postId: postId,
      };
      const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo?.access}`
        }
      }

      await axios.patch('/api/subreddit/post/vote', payload, config);
    },
    onError: (err, voteType) => {
      if (voteType === 'UP') setVotesAmt((prev) => prev - 1);
      else setVotesAmt((prev) => prev + 1);

      // reset current vote
      setCurrentVote(prevVote);

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
        description: 'Your vote was not registered. Please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      dispatch(fetchPostDetails(postId))
      dispatch(fetchPosts())
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined);
        if (type === 'UP') setVotesAmt((prev) => prev - 1);
        else if (type === 'DOWN') setVotesAmt((prev) => prev + 1);
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote(type);
        if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === 'DOWN')
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  // useEffect(() => {
  // }, [prevVote])


  return (  
    <div className='flex flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0'>
      {/* upvote */}
      <Button
        onClick={() => vote('UP')}
        size='sm'
        variant='ghost'
        aria-label='upvote'>
        <ArrowBigUp
          className={cn('h-5 w-5 text-zinc-700', {
            'text-emerald-500 fill-emerald-500': currentVote === 'UP',
          })}
        />
      </Button>

      {/* score */}
      <p className='text-center py-2 font-medium text-sm text-zinc-900'>
        {votesAmt}
      </p>

      {/* downvote */}
      <Button
        onClick={() => vote('DOWN')}
        size='sm'
        className={cn({
          'text-emerald-500': currentVote === 'DOWN',
        })}
        variant='ghost'
        aria-label='downvote'>
        <ArrowBigDown
          className={cn('h-5 w-5 text-zinc-700', {
            'text-red-500 fill-red-500': currentVote === 'DOWN',
          })}
        />
      </Button>
    </div>
  );
};

export default PostVoteClient;
