import { authService } from "fbase";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";

function Auth(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {currentTarget:{name,value}} = event;
    if(name === "email") {
      setEmail(value);
    } else if(name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let data;
    try {
      if(newAccount){
        data = await createUserWithEmailAndPassword(authService, email, password);
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
    
  };
  const toggleAccount = () => setNewAccount((prev)=>!prev);
  const onSocialClick = async (event) => {
    const {currentTarget:{name}} = event;
    let provider;
    if(name === "google"){
      provider = new GoogleAuthProvider();
    } else if(name === "github") {
      provider = new GithubAuthProvider();
    }
    const result = await signInWithPopup(authService,provider);
    console.log(result);
  }
  return (<>
    <form onSubmit={onSubmit}>
      <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
      <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
      <input type="submit" value={newAccount ? "Create Account" : "Log in"} />
      {error}
      <div>
        <span onClick={toggleAccount}>{newAccount ? "log in" : "create account"}</span>
      </div>
    </form>
    <div>
      <button name="google" onClick={onSocialClick}>Continue with Google</button>
      <button name="github" onClick={onSocialClick}>Continue with Github</button>
    </div>
  </>);
}

export default Auth;