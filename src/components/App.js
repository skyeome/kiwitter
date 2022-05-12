import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init,setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj,setUserObj] = useState(null);
  useEffect(()=>{
    onAuthStateChanged(authService,(user)=>{
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[])
  //console.log(authService.currentUser);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Service Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Kiwitter</footer>
    </>
  );
}

export default App;