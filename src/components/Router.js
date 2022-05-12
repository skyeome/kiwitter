import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

function AppRouter({isLoggedIn,userObj}){
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? 
        <>
          <Route exact path="/" element={<Home userObj={userObj} />} />
          <Route exact path="/profile" element={<Profile />} />
        </> : 
        <Route exact path="/" element={<Auth />} /> }
      </Routes>
    </Router>
  )
}
export default AppRouter;