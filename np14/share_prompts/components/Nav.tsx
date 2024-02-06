'use client'

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders, ClientSafeProvider } from "next-auth/react";
import { LiteralUnion } from "type-fest"; 

type ProviderType = 'apple' | 'auth0' | 'azure-ad-b2c' | 'battlenet' | 'box' | 'cognito' | 'credentials' | 'discord' | 'email' | 'eveonline' | 'facebook' | 'github' | 'gitlab' | 'google' | 'identity-server4' | 'linkedin' | 'mixer' | 'okta' | 'slack' | 'spotify' | 'twitch' | 'twitter' | 'yandex';

const Nav = () => {
	const isUserLogedIn = true;
	const [providers, setProviders] = useState<Record<ProviderType, ClientSafeProvider> | null>(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	const handleSignOut = () => {
		signOut();
	  };

	useEffect(() => {
		(async () => {
		  const res = await getProviders();
		  setProviders(res);
		})();
	  }, []);

  return (
	<nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>
	  <div className="sm:flex hidden">
		{isUserLogedIn ? (
			<div className='flex gap-3 md:gap-5'>
			  <Link href='/create-prompt' className='black_btn'>
                Create Post
              </Link>
			  <button type='button' onClick={handleSignOut} className='outline_btn'>
                Sign Out
              </button>
			  {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>

              </div>
            )}
			</div>
		):
		(
		  <>
		    {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
		  </>
		)}
	  </div>
	</nav>
  )
}

export default Nav
