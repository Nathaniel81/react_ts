import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
// import { toast } from '@/hooks/use-toast'
// import { useCustomToasts } from '@/hooks/use-custom-toasts'
// import { CreateSubredditPayload } from '@/lib/validators/subreddit'
import {  AppDispatch, RootState } from '@/redux/store'
import { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { createSubreddit } from '@/redux/slices/subredditCreateSlice'
import { resetState } from '@/redux/slices/subredditCreateSlice'


const CreateSubredditPage = () => {
  const { toast } = useToast()
  const navigate = useNavigate();
  const [input, setInput] = useState<string>('')

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin

  const newSubreddit = useSelector((state: RootState) => state.subredditCreate);
  const { subreddit, loading, error } = newSubreddit;
  
  const dispatch = useDispatch<AppDispatch>();

  
  const createCommunity = () => {
      setInput('')
      dispatch(createSubreddit({ 'name': input }))
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }

    if (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        variant: 'destructive',
      });
      dispatch(resetState());
    }

    if (subreddit) {
      navigate(`/r/${subreddit?.name}`);
    }
  }, [navigate, userInfo, error, dispatch, subreddit, toast])


  return (
    <div className='container flex items-center h-full max-w-3xl mx-auto'>
      <div className='relative bg-white w-full h-fit p-4 rounded-lg space-y-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-semibold'>Create a Community</h1>
        </div>

        <hr className='bg-red-500 h-px' />

        <div>
          <p className='text-lg font-medium'>Name</p>
          <p className='text-xs pb-2'>
            Community names including capitalization cannot be changed.
          </p>
          <div className='relative'>
            <p className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400'>
              r/
            </p>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='pl-6'
            />
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          <Button
            disabled={loading}
            variant='subtle'
			onClick={() => navigate(-1)}
			>
            Cancel
          </Button>
          <Button
            isLoading={loading}
            disabled={input.length === 0}
            onClick={() => createCommunity()}
            // onClick={() => {
            //   toast({
            //     title: "Scheduled: Catch up",
            //     description: "Friday, February 10, 2023 at 5:57 PM",
            //   })
            // }}
			>
            Create Community
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateSubredditPage
