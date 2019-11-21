import React, { useState } from 'react';

const Register = ({ facade }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        var register = facade.register(username, password);
        alert("Username: " + username + " Password: " + password + " --- " + register);
    }

    const onChange = (e) => {
        if (e.target.id === "uname") {
            setUsername(e.target.value);
        } else {
            setPassword(e.target.value);
        }
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