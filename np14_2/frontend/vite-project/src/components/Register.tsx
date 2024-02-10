/*eslint-disable*/
import { useState, SyntheticEvent } from 'react'
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
	const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [redirect, setRedirect] = useState(false);

	const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('http://127.0.0.1:8000/api/register/', {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            password_confirm: passwordConfirm
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/" />
    }

    return <main className="form-signin w-50 mx-auto mt-5">
		<Link to='/login'>Login</Link>
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <div className="form-floating my-3">
                <input className="form-control" id="floatingInput" placeholder="First Name"
                       onChange={e => setFirstName(e.target.value)}
                />
                <label htmlFor="floatingInput">First Name</label>
            </div>

            <div className="form-floating my-3">
                <input className="form-control" id="floatingInput" placeholder="Last Name"
                       onChange={e => setLastName(e.target.value)}
                />
                <label htmlFor="floatingInput">Last Name</label>
            </div>

            <div className="form-floating my-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                       onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating my-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                       onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-floating my-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password Confirm"
                       onChange={e => setPasswordConfirm(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password Confirm</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </main>
}

export default Register