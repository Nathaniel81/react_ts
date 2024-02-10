import {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const HomePage = () => {
	// const dispatch = useDispatch();
    const [message, setMessage] = useState('You are not unauthenticated');
    // const auth = useSelector((state: RootState) => state.auth.value);
	useEffect(() => {
		(async () => {
			try {
				const {data} = await axios.get('user/', { withCredentials: true });
				setMessage(`Hi ${data.first_name} ${data.last_name}`);
			} catch (e) {
				setMessage('You are not authenticated');
			}
		})();
	}, []);
	

  return (
  <div className="container mt-5 text-center">
	<Link to='/login'>Login</Link>
	<h3>{message}</h3>
  </div>
  )
}

export default HomePage