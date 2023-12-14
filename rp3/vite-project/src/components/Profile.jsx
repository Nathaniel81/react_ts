import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user && state.user.value);
  
  if (!user) {
    return (
      <div>
        <h1>Profile page</h1>
        <p>No user data available.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Profile page</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
