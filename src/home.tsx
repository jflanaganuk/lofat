import React from "react";
import { Link } from "react-router-dom";

import "./home.scss";

export const Home = () => {
    return (
        <div className="homeContainer">
            <img
                className="homeLogo"
                src="./images/lofat_logo.png"
                alt="lofat logo image"
            />
            <h2 className="homeSub">List Of Films And TV</h2>
            <div className="homeList">
                <Link to="/movie/">Popular Movies</Link>
                <Link to="/tv/">Popular TV Shows</Link>
                <Link to="/actors/">Popular Actors</Link>
                <Link to="/lists/">More...</Link>
            </div>
        </div>
    );
};
