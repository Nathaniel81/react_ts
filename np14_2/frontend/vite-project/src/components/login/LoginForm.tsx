/*eslint-disable*/
import { useState, SyntheticEvent } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

const LoginForm = () => {
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
		try {
			const {data} = await axios.post('login/', {
				email,
				password
			}, {withCredentials: true});
			console.log(data)
			navigate('/')
		} catch (error) {
			console.log(error)
		}
    }

  return (
   <div className="form-signin w-50 mx-auto mt-5">
	<Link to='/register'>Register</Link>
    <form className='w-75 mx-auto' onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
    
      <div className="form-floating mb-2">
        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
        <label>Email address</label>
      </div>
      <div className="form-floating mb-2">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <label>Password</label>
      </div>
    
      <div className="form-check text-start my-3">
        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
        <label className="form-check-label">
          Remember me
        </label>
      </div>
      <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
    </form>
  </div>
  )
}

export default LoginForm
