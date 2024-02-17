// import { authOptions } from '@/lib/auth'
// import { getServerSession } from 'next-auth'
import { Icons } from './Icons'
import UserAccountNav from './UserAccountNav'
// import SearchBar from './SearchBar'
import { useSelector} from 'react-redux'
import { Link } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { buttonVariants } from './ui/Button'
import { RootState } from '@/redux/store'


const Navbar = () => {
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin

  return (
    <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2'>
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        <Link to='/' className='flex gap-2 items-center'>
          <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
          <p className='hidden text-zinc-700 text-sm font-medium md:block'>Breadit</p>
        </Link>
      <div className="flex justify-between gap-5">
        {/* <SearchBar /> */}
        {userInfo ? (
        <UserAccountNav />
        ) : (
          <Link to='/sign-in' className={buttonVariants()}>
            Sign In
          </Link>
        )}
        <ModeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar