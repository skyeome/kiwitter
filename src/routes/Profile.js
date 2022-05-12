import { authService } from "fbase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Profile(){
  const navigate = useNavigate();
  const onLogOutClick = async () => {
    await signOut(authService);
    navigate("/");
  }
  return <>
    <button onClick={onLogOutClick}>Log Out</button>
  </>
}

export default Profile;