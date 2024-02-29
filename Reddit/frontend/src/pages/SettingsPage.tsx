// import { redirect } from 'next/navigation'

// import { authOptions, getAuthSession } from '@/lib/auth'
// import { UserNameForm } from "@/components/UsernameForm"
import UserNameForm from "@/components/UsernameForm";
import { useSelector } from 'react-redux'
import {  RootState } from '@/redux/store'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useParams, useNavigate, useLocation } from 'react-router-dom';

export default function SettingsPage() {

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
	if (!userInfo) {
		navigate('/')
	}
  },[userInfo, navigate])


  return (
    <div className='max-w-4xl mx-auto py-12'>
      <div className='grid items-start gap-8'>
        <h1 className='font-bold text-3xl md:text-4xl'>Settings</h1>

        <div className='grid gap-10'>
          <UserNameForm
            user={{
              id: userInfo?.id,
              username: userInfo?.username || '',
            }}
          />
        </div>
      </div>
    </div>
  )
}
