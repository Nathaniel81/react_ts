import { Button } from "./ui/Button";
import { subscribe as subscribeAction, resetState } from "@/redux/slices/subscribeSlice";
import { unsubscribe as unsubscribeAction, resetState as unsubscribeReset } from "@/redux/slices/unsubscribeSlice";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '@/hooks/use-toast'
import {  AppDispatch, RootState } from '@/redux/store'
import { fetchSubreddit } from "@/redux/slices/subredditDetailSlice";


interface SubscribeLeaveToggleProps {
    subredditName: string;
    isSubscribed: boolean | null;
}

const SubscribeLeaveToggle =  ({
    isSubscribed,
    subredditName,
}: SubscribeLeaveToggleProps)  => {
    const dispatch = useDispatch<AppDispatch>();
    const { toast } = useToast()

    const { success, loading, error } = useSelector((state: RootState) => state.subscribe);
    const { success: leavingSuccess, loading: leavingLoading, error: leavingError } = useSelector((state: RootState) => state.unsubscribe);

    useEffect(() => {
        if (success) {
            dispatch(fetchSubreddit({ name: subredditName }))
            toast({
                title: 'Subscribed!',
                description: `You are now subscribed to r/${subredditName}`,
            });
            dispatch(resetState());
        }

        if (leavingSuccess) {
            dispatch(fetchSubreddit({ name: subredditName }))
            toast({
                title: 'Unsubscribed!',
                description: `You left r/${subredditName}`,
            });
            dispatch(unsubscribeReset());
        }

        if (error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                variant: 'destructive',
            });
        }

        if (leavingError) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                variant: 'destructive',
            });
        }
    }, [success, leavingSuccess, error, leavingError, dispatch, toast, subredditName]);

    const subscribe = () => {
        if (!loading) {
            dispatch(subscribeAction({ subredditName }));
        }
    }

    const unsubscribe = () => {
        if (!leavingLoading) {
            dispatch(unsubscribeAction({ subredditName }));
        }
    }

    return isSubscribed ? (
        <Button
          className='w-full mt-1 mb-4'
          isLoading={leavingLoading}
          onClick={unsubscribe}
        >
          Leave community
        </Button>
      ) : (
        <Button
          className='w-full mt-1 mb-4'
          isLoading={loading}
          onClick={subscribe}
        >
          Join to post
        </Button>
      )
}

export default SubscribeLeaveToggle;
