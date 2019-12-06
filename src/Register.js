import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Register = ({ facade, logInState }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [favAirport, setFavAirport] = useState("");
    const [redirect, setRedirect] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if(username === "" || password === "") {
            return;
        } 

        facade.register(username, password, favAirport)
            .then(data => {
                alert("Brugernavn '" + data.username + "' oprettet!");
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
        } else if (e.target.id === "pword") {
            setPassword(e.target.value);
        } else {
            setFavAirport(e.target.value);
        }
    }

    if (redirect) {
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
                    </div>
                    <div>
                        <select name="airport" form="register">
                            <option value="">Choose airport</option>
                            <option value="BMA-sky">BMA</option>
                            <option value="STOC-sky">STO</option>
                            <option value="ARN-sky">ARN</option>
                            <option value="NYO-sky">NYO</option>
                            <option value="VST-sky">VST</option>
                        </select>
                        <button className="btn btn-primary">Register</button>
                    </div>
                    <div>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;