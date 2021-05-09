import React, { useState } from "react";

import "./menu.scss";
export const Settings = () => {
    const [urlInputRadarr, setUrlInputRadarr] = useState(
        localStorage.getItem("radarrUrl") || ""
    );
    const [urlInputSonarr, setUrlInputSonarr] = useState(
        localStorage.getItem("sonarrUrl") || ""
    );
    const [submitMessage, setSubmitMessage] = useState("Submit");
    const submitForm = () => {
        if (urlInputRadarr) localStorage.setItem("radarrUrl", urlInputRadarr);
        if (urlInputSonarr) localStorage.setItem("sonarrUrl", urlInputSonarr);
        setSubmitMessage("Submitted!");
        setTimeout(() => {
            setSubmitMessage("Submit");
        }, 2000);
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
                    Enter your <b>radarr</b> network address here
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
                    Enter your <b>sonarr</b> network address here
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
                <button
                    disabled={submitMessage === "Submitted!"}
                    onClick={() => submitForm()}
                >
                    {submitMessage}
                </button>
                <button onClick={() => resetForm()}>Reset</button>
            </div>
        </div>
    );
};
