import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Register = ({ facade, logInState }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        facade.register(username, password)
        .then(data => {
            alert("Brugernavn '" + data.username +  "' oprettet!");
            logInState(data.roles, username);
            setRedirect(true);    
        })
        .catch(err => {
          alert("Something went wrong!");
        });
    }

    const onChange = (e) => {
        if (e.target.id === "uname") {
            setUsername(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }

    if(redirect) {
        return <Redirect to="/user" />
      }

    return (
        <div className="container container-small">
            <div className="data-wrapper">
                <h2>Register</h2><br />
                <form className="form-register" onSubmit={onSubmit} onChange={onChange} >
                    <div className="form form-group">
                        <input className="form-control" placeholder="Username" id="uname" />
                    </div><div className="form-group">
                        <input className="form-control" type="password" placeholder="Password" id="pword" /> <br />
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;