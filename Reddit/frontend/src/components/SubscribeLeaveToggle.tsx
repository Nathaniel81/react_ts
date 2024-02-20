import { Button } from "./ui/Button";
import { subscribe as subscribeAction } from "@/redux/slices/subscribeSlice";
import { unsubscribe as unsubscribeAction } from "@/redux/slices/unsubscribeSlice";
// import { useEffect } from 'react'
import {  AppDispatch, RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'


interface SubscribeLeaveToggleProps {
    isSubscribed: boolean
    // subredditId: string
    subredditName: string
}

const SubscribeLeaveToggle =  ({
    isSubscribed,
    subredditName,
}: SubscribeLeaveToggleProps)  => {
    const dispatch = useDispatch<AppDispatch>();

  const join  = useSelector((state: RootState) => state.subscribe);
  const { success, loading, error } = join;

    const subscribe = () => {
        dispatch(subscribeAction({ subredditName }))
    }

    const unsubscribe = () => {
        dispatch(unsubscribeAction({ subredditName }))
    }

    return isSubscribed ? (
        <Button
          className='w-full mt-1 mb-4'
          isLoading={loading}
          onClick={() => unsubscribe()}
          >
          Leave community
        </Button>
      ) : (
        <Button
          className='w-full mt-1 mb-4'
          isLoading={loading}
          onClick={() => subscribe()}
          >
          Join to post
        </Button>
      )
    }

export default SubscribeLeaveToggle;
