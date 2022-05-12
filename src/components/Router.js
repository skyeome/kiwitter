import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

function AppRouter({isLoggedIn}){
  return <Router>
    <Routes>
      {isLoggedIn ? <Route exact path="/" element={<Home />} /> : <Route exact path="/" element={<Auth />} /> }
    </Routes>
  </Router>
}
export default AppRouter;