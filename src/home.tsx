import React from "react";
import { Link } from "react-router-dom";

import "./home.scss";

export const Home = () => {
    return (
        <div className="homeContainer">
            <img src="./images/lofat_logo.png" alt="lofat logo image" />
            <h2>List Of Films And Television</h2>
            <Link to="/movie/">Popular Movies</Link>
        </div>
    );
};
