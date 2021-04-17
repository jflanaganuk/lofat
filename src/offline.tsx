import React from "react";

export const Offline = () => {
    return (
        <div>
            <h2>Offline Page</h2>
            <p>
                Looks like you are offline and are visiting a page that is not
                cached!
            </p>
            <p>
                You could click <a href="/imdbfetch">here</a> to return to the
                homepage
            </p>
        </div>
    );
};
