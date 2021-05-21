import React from "react";

import "./githubLink.scss";

export const GithubLink = () => {
    return (
        <div className="githubContainer">
            <p>
                View the source code{" "}
                <a
                    href="https://github.com/jflanaganuk/lofat"
                    target="_blank"
                    rel="noopener"
                >
                    here!
                </a>
            </p>
        </div>
    );
};
