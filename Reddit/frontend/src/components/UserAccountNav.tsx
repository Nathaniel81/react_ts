import { Link } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { UserAvatar } from './UserAvatar'

import { useSelector} from 'react-redux'
import { RootState } from '@/redux/store'


// type User = {
// 	image: string | null;
// 	name: string | null;
// 	email: string| null;
// 	// include other properties as needed
//   };

// interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
//   user: Pick<User, 'name' | 'image' | 'email'>
// }
// function UserAccountNav({ user }: UserAccountNavProps) {
	type User = {
		name: string | null;
		email: string | null;
		profile_picture: string | null;
};
type UserLoginState = {
	userInfo: User | null;
  };
	
  function UserAccountNav() {
	const userLogin = useSelector((state: RootState) => state.userLogin as UserLoginState);
	const { userInfo } = userLogin

	// const signOut = () => {}
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={userInfo}
          className='h-8 w-8'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {userInfo && userInfo.name && <p className='font-medium'>{userInfo && userInfo.name}</p>}
            {userInfo && userInfo.email && (
              <p className='w-[200px] truncate text-sm text-muted-foreground'>
                {userInfo && userInfo.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to='/'>Feed</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to='/r/create'>Create Community</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to='/settings'>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to='/settings'>Settings</Link>
		</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav;
