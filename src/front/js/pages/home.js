import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Redirect } from "react-router-dom";
import { Private } from "./private";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, serUsername] = useState("");


    if (store.token && store.token !== "" && store.token !== undefined) {
        return <Private />;
    }

    return (
        <div>
            
                <div className="col-12 d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
                    <form>
                        <div className="form-group my-2">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="exampleInputUsername">Username</label>
                            <input type="text" className="form-control" id="exampleInputUsername" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <small id="emailHelp" className="form-text text-muted">Must be 8-20 characters long.</small>
                        </div>
                        <div className="form-check m-1">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Save my login</label>
                        </div>
                        <a href="#" className="card-link">Don't remember my password</a>
                        <div className="buttons">
                            {!store.token ? (
                                <button type="button" className="btn btn-primary my-2" onClick={() => actions.login(email,password)}>Log in</button>
                            ) : (
                                <button type="button" className="btn btn-primary my-2" onClick={() => actions.logout()}>Log out</button>
                            )}
                        </div>
                        {!store.token && store.token !== "" && store.token !== undefined && (
                            <p>No authorization. Please <Link to="/createUser">sign up</Link> first.</p>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};


