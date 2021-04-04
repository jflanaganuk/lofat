import React, { useState } from "react";
import { Title } from "../types";
// @ts-ignore
import wrench from "./wrench.svg";

import "./radarrIntegration.scss";

export const RadarrIntegration = (props: { movie: Title }) => {
    const url = localStorage.getItem("radarrUrl");
    if (!url) return <RadarrSetup />;
    return (
        <a
            href={`http://${url}/add/new?term=${props.movie.title}`}
            target="_blank"
            rel="noopener"
        >
            <button className="add">
                <span className="big">+ </span>Add to Radarr
            </button>
        </a>
    );
};

const RadarrSetup = (props) => {
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
    const [urlInput, setUrlInput] = useState("");
    const submitForm = () => {
        localStorage.setItem("radarrUrl", urlInput);
        props.setShown(false);
        window.location.reload();
    };
    return (
        <div className="formBackground">
            <div className="formInner">
                <h1>Settings</h1>
                <input
                    placeholder="Radarr Ip Address"
                    onChange={(e) => setUrlInput(e.target.value)}
                />
                <button onClick={() => submitForm()}>Submit</button>
            </div>
        </div>
    );
};
