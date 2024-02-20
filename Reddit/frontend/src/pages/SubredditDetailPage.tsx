import { format } from 'date-fns'
import { fetchSubreddit } from '@/redux/slices/subredditDetailSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  AppDispatch, RootState } from '@/redux/store'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SubredditDetail from '@/components/SubredditDetail'
import { buttonVariants } from '@/components/ui/Button'
import SubscribeLeaveToggle from '@/components/SubscribeLeaveToggle'



const SubredditDetailPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { slug } = useParams();
  const subredditName = slug ?? 'default'; 

  const subredditDetail = useSelector((state: RootState) => state.subredditDetail);
  const { subreddit } = subredditDetail;

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin

  const dispatch = useDispatch<AppDispatch>();

  const isSubscribed = subreddit && subreddit.is_subscriber;
    useEffect(() => {
      if (!subreddit.name) {
        dispatch(fetchSubreddit({ name: subredditName }))
      }
    },[dispatch, slug, subredditName, subreddit])


  return (
    <div className='sm:container max-w-7xl mx-auto h-full pt-12'>
      <div>
        {/* <ToFeedButton /> */}

        <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
          <ul className='flex flex-col col-span-2 space-y-6'>
            <SubredditDetail />
          </ul>

          <div className='overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last'>
            <div className='px-6 py-4'>
              <p className='font-semibold py-3'>About r/{subreddit.name}</p>
            </div>
            <dl className='divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white'>
            <div className='flex justify-between gap-x-4 py-3'>
                <dt className='text-gray-500'>Created</dt>
                <dd className='text-gray-700'>
                  {subreddit.created_at && (
                    <time dateTime={new Date(subreddit.created_at).toDateString()}>
                      {format(new Date(subreddit.created_at), 'MMMM d, yyyy')}
                    </time>
                  )}
                </dd>
              </div>
              <div className='flex justify-between gap-x-4 py-3'>
                <dt className='text-gray-500'>Members</dt>
                <dd className='flex items-start gap-x-2'>
                  <div className='text-gray-900'>{subreddit && subreddit.members_count}</div>
                </dd>
              </div>
              {subreddit && subreddit.creator && subreddit.creator.id === userInfo?.id ? (
                <div className='flex justify-between gap-x-4 py-3'>
                  <dt className='text-gray-500'>You created this community</dt>
                </div>
              ) : null}
              {/* {subreddit && subreddit.creator && subreddit.creator.id !== userInfo?.id ? (
                  <SubscribeLeaveToggle />
                  isSubscribed={isSubscribed}
                //   subredditId={subreddit.id}
                //   subredditName={subreddit.name}
                // />
              ) : null} */}
              {subreddit && subreddit.creator && subreddit.creator.id !== userInfo?.id ? (
                <SubscribeLeaveToggle
                  isSubscribed={isSubscribed}
                  subredditId={subreddit.id}
                  subredditName={subreddit.name}
                />
              ) : null}

              {/* ASTK */}
              <div
                className={buttonVariants({
                  variant: 'outline',
                  className: 'w-full mb-6 cursor-pointer',
                })}
                onClick={()=> navigate(path + `/submit`)}>
                Create Post
              </div>
              {/* ASTK */}

            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubredditDetailPage
