import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";

export const Lists = () => {
    return (
        <div className="homeContainer">
            <div className="homeList">
                <Link to="/movie/">Popular Movies</Link>
                <Link to="/tv/">Popular TV Shows</Link>
                <Link to="/actors/">Popular Actors</Link>
                <Link to="/lists/">More...</Link>
            </div>
        </div>
    );
};
