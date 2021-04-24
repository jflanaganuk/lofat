import React from "react";
import { TmdbMovieDetail } from "../types";

import "./menu.scss";

export const RadarrIntegration = (props: { movie: TmdbMovieDetail }) => {
    const url = localStorage.getItem("radarrUrl");
    if (!url) return null;
    return (
        <a
            href={`http://${url}/add/new?term=tmdb%3A${props.movie.id}`}
            target="_blank"
            rel="noopener"
            className="roundButton"
        >
            +
        </a>
    );
};
