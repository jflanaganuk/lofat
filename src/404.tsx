import React from "react";
import { Link } from "react-router-dom";

import "./404.scss";

export const NotFound = () => {
    return (
        <div className="notFoundContainer">
            <h1 className="notFoundHeader">404</h1>
            <h2 className="notFoundSubheader">Page not found</h2>
            <p>(Or you could just be offline and this page is not cached!)</p>
            <p className="notFoundReturnLink">
                Return to <Link to="/">Home</Link>
            </p>
        </div>
    );
};
