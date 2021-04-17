import React, { useState } from "react";
import { TmdbMovieDetail } from "../types";
// @ts-ignore
import wrench from "./wrench.svg";

import "./radarrIntegration.scss";

export const RadarrIntegration = (props: { movie: TmdbMovieDetail }) => {
    const url = localStorage.getItem("radarrUrl");
    if (!url) return <RadarrSetup />;
    return (
        <>
            <RadarrSetup />
            <a
                href={`http://${url}/add/new?term=tmdb%3A${props.movie.id}`}
                target="_blank"
                rel="noopener"
            >
                <button className="add">
                    <span className="big">+ </span>Add to Radarr
                </button>
            </a>
        </>
    );
};

const RadarrSetup = () => {
    const [shown, setShown] = useState(false);
    return (
        <>
            <button
                className="setup"
                onClick={() => setShown(!shown)}
                aria-label="setup radarr icon"
            >
                <img src={wrench} alt="wrench icon" />
            </button>
            {shown && <RadarrForm setShown={setShown} />}
        </>
    );
};

const RadarrForm = (props) => {
    const [urlInput, setUrlInput] = useState(
        localStorage.getItem("radarrUrl") || ""
    );
    const submitForm = () => {
        localStorage.setItem("radarrUrl", urlInput);
        props.setShown(false);
        window.location.reload();
    };
    const resetForm = () => {
        localStorage.clear();
        window.location.reload();
    };
    return (
        <div className="formBackground">
            <div className="formInner">
                <h1>Settings</h1>
                <p>
                    Enter your <b>radarr</b> LAN network address here
                </p>
                <small>
                    Example: the full url: "https://192.168.0.1:12345" would be
                    entered as "192.168.0.1:12345"
                </small>
                <input
                    placeholder="Radarr Ip Address"
                    onChange={(e) => setUrlInput(e.target.value)}
                    value={urlInput}
                />
                <button onClick={() => submitForm()}>Submit</button>
                <button onClick={() => resetForm()}>Reset</button>
            </div>
        </div>
    );
};
