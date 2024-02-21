import { format } from 'date-fns'
// import { fetchSubreddit } from '@/redux/slices/subredditDetailSlice'
// import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

// import SubredditDetail from '@/components/SubredditDetail'
import { buttonVariants } from '@/components/ui/Button'
import SubscribeLeaveToggle from '@/components/SubscribeLeaveToggle'
 

const SubredditSidebar = () => {
	const navigate = useNavigate();
	const loacation = useLocation();
	const path = location.pathname;

	const subredditDetail = useSelector((state: RootState) => state.subredditDetail);
	const { subreddit } = subredditDetail;

	const userLogin = useSelector((state: RootState) => state.userLogin);
    const { userInfo } = userLogin;

	const isSubscribed = subreddit && subreddit.is_subscriber;


  return (
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
            {subreddit && subreddit.creator && subreddit.creator.id !== userInfo?.id ? (
              <SubscribeLeaveToggle
                isSubscribed={isSubscribed ?? false}
                subredditId={subreddit.id}
                subredditName={subreddit.name}
              />
            ) : null}
            <div
              className={buttonVariants({
                variant: 'outline',
                className: 'w-full mb-6 cursor-pointer',
              })}
              onClick={()=> navigate(path + `/submit`)}>
              Create Post
            </div>
          </dl>
          </div>
  );
};

export default SubredditSidebar;







