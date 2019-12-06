import React, { useState } from "react"
import facade from "./apifacade";
import {
    Redirect,
    Link
  } from "react-router-dom";

function Login(props) {
    const [err, setErr] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
  
    const login = (event) => {
      event.preventDefault();
      facade.login(username, password)
        .then(data => {props.logInState(data.roles, username, data.airport); setRedirect(true); console.log(data.airport) })
        .catch(err => {
          setErr("Wrong username or password");
        });
    }
  
    const onChange = (event) => {
      setErr("");
      if (event.target.id === "username") {
        setUsername(event.target.value);
      } else {
        setPassword(event.target.value);
      }
    }
  
    if(redirect) {
      return <Redirect to="/" />
    }
  
    return (
      <div className="container container-small">
        <div className="data-wrapper">
          <h2>Login</h2><br />
          <form className="form-signin" onSubmit={login} onChange={onChange} >
            <div className="form form-group">
              <input className="form-control" placeholder="User Name" id="username" />
            </div><div className="form-group">
              <input className="form-control" type="password" placeholder="Password" id="password" /> <br />
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <Link to="/register">
          Link to Register
        </Link>
        </div>
      </div>
    )
  }

  export default Login;