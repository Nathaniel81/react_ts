import { Button } from '@/components/ui/Button'
import { Input } from './ui/input'
import { Image as ImageIcon, Link2 } from 'lucide-react'
// import { FC } from 'react'
import { UserAvatar } from './UserAvatar'
import { AppDispatch, RootState } from '@/redux/store'
// import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
// interface MiniCreatePostProps {
//   session: Session | null
// }

const MiniCreatePost = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <li className='overflow-hidden rounded-md bg-white shadow'>
      <div className='h-full px-6 py-4 flex justify-between gap-6'>
        <div className='relative'>
          <UserAvatar
            user={userInfo}
          />

          <span className='absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white' />
        </div>
        <Input
          onClick={() => navigate(path + '/submit')}
          readOnly
          placeholder='Create post'
        />
        <Button
          onClick={() => navigate(path + '/submit')}
          variant='ghost'>
          <ImageIcon className='text-zinc-600' />
        </Button>
        <Button
          onClick={() => navigate(path + '/submit')}
          variant='ghost'>
          <Link2 className='text-zinc-600' />
        </Button>
      </div>
    </li>
  )
}

export default MiniCreatePost