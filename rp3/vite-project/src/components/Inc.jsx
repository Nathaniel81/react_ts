const Login = ( {incCount} ) => {
  return (
	<div className='bg-slate-500 flex justify-center w-[70px] rounded p-5 mb-4 cursor-pointer' onClick={incCount}>
      <div className='text-2xl'>
      +
      </div>
    </div>
  )
}

export default Login