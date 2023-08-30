import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Private = () => {
    return (
        <div className="alert alert-primary" role="alert">
            Valid User
        </div>
    )
}