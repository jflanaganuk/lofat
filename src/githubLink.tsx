import React from "react";

import "./githubLink.scss";

export const GithubLink = (props) => {
    return (
        <div className="githubContainer">
            <p>
                View the source code{" "}
                <a
                    href="https://github.com/jflanaganuk/imdbfetch"
                    target="_blank"
                    rel="noopener"
                >
                    here!
                </a>
            </p>
        </div>
    );
};
