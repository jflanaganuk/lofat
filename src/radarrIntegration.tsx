import React from "react";

import "./menu.scss";

export const RadarrIntegration = (props: {
    name: string;
    kind: "movie" | "tv";
}) => {
    const url = localStorage.getItem(
        props.kind === "movie" ? "radarrUrl" : "sonarrUrl"
    );
    if (!url) return null;
    return (
        <a
            href={`http://${url}/add/new?term=${props.name}`}
            target="_blank"
            rel="noopener"
            className="roundButton"
        >
            +
        </a>
    );
};
