import React, { useState } from "react";

import "./menu.scss";
import { Link, useHistory } from "react-router-dom";
// @ts-ignore
import LeftArrow from "../images/left-arrow.svg";

export const Menu = () => {
    const history = useHistory();
    const [shown, setShown] = useState(false);
    return (
        <>
            <div className="menuContainer">
                <LeftArrow
                    className="menuBack"
                    onClick={() => {
                        history.goBack();
                    }}
                />
                <Link to="/" className="menuItem">
                    Home
                </Link>
                <Link to="/search" className="menuItem">
                    Search
                </Link>
                <Link to="/lists" className="menuItem">
                    Lists
                </Link>
                <div
                    className="menuItem"
                    onClick={() => {
                        setShown(true);
                        document.body.style.position = "fixed";
                        document.body.style.top = `-${window.scrollY}px`;
                    }}
                >
                    Settings
                </div>
            </div>
            {shown && (
                <>
                    <button
                        className={`setup close`}
                        onClick={() => {
                            setShown(false);
                            document.body.style.position = "";
                            document.body.style.top = "";
                        }}
                        aria-label="setup radarr icon"
                    >
                        <p>X</p>
                    </button>
                    <RadarrForm setShown={setShown} />
                </>
            )}
        </>
    );
};

const RadarrForm = (props) => {
    const [urlInputRadarr, setUrlInputRadarr] = useState(
        localStorage.getItem("radarrUrl") || ""
    );
    const [urlInputSonarr, setUrlInputSonarr] = useState(
        localStorage.getItem("sonarrUrl") || ""
    );
    const submitForm = () => {
        localStorage.setItem("radarrUrl", urlInputRadarr);
        localStorage.setItem("sonarrUrl", urlInputSonarr);
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
                    onChange={(e) => setUrlInputRadarr(e.target.value)}
                    value={urlInputRadarr}
                />
                <p>
                    Enter your <b>sonarr</b> LAN network address here
                </p>
                <small>
                    Example: the full url: "https://192.168.0.1:12345" would be
                    entered as "192.168.0.1:12345"
                </small>
                <input
                    placeholder="Sonarr Ip Address"
                    onChange={(e) => setUrlInputSonarr(e.target.value)}
                    value={urlInputSonarr}
                />
                <small>
                    Note: Only works on sonarr/radarr versions 3 and above
                </small>
                <button onClick={() => submitForm()}>Submit</button>
                <button onClick={() => resetForm()}>Reset</button>
            </div>
        </div>
    );
};
