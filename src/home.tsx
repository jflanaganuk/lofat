import React from "react";

import "./home.scss";
import { Search } from "./search";

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
                <Search hideTitle={true} />
            </div>
        </div>
    );
};
