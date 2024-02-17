import { AvatarProps } from '@radix-ui/react-avatar'
import { Icons } from '@/components/Icons'
import { Avatar, AvatarFallback } from './ui/avatar'
// import { useSelector} from 'react-redux'
// import { RootState } from '@/redux/store'


type User = {
	profile_picture: string | null;
	name: string | null;
  };

interface UserAvatarProps extends AvatarProps {
	user: User | null
  }

export function UserAvatar({ user, ...props }: UserAvatarProps) {
	// const userLogin = useSelector((state: RootState) => state.userLogin);
	// const { userInfo } = userLogin

  return (
    <Avatar {...props}>
      {user?.profile_picture ? (
        <div className='relative aspect-square h-full w-full'>
          <img
            src={user?.profile_picture}
            alt='profile picture'
            referrerPolicy='no-referrer'
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.name}</span>
          <Icons.user className='h-4 w-4' />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
