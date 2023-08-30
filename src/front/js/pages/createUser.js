import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const CreateUser = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, serUsername] = useState("");

    const handleSignUp = () => {
        actions.register(email, username, password);
    };

    return (
        <div className="col-12 d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
            <form>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputUsername">Username</label>
                    <input type="text" className="form-control" id="exampleInputUsername" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <small id="emailHelp" className="form-text text-muted">Password must be between 8 and 20 characters.</small>
                </div>
                <div className="form-check m-1">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">I agree with the terms and conditions</label>
                </div>
                    <button type="button" className="btn btn-primary" onClick={handleSignUp}>
                        Sign up
                    </button>

            </form>
        </div>
    );
};
