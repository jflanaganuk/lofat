import React from "react";

import "./attribution.scss";

export const Attribution = () => {
    return (
        <a
            className="attributionContainer"
            href="https://themoviedb.org"
            target="_blank"
            rel="noopener"
        >
            <img
                className="attributionImg"
                src="images/tmdb.svg"
                alt="Logo for The Movie Database"
            />
            <small>Data provided by The Movie Database</small>
        </a>
    );
};
