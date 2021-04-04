import React from "react";

export const RadarrIntegration = (props) => {
    const url = localStorage.getItem('radarrUrl')
    if (!url) return null
    return (
        <a
            href={`http://${url}/add/new?term=${props.movie.title}`}
            target="_blank"
            rel="noopener"
        >
            <button className="add">+</button>
        </a>
    );
};
