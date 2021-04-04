import React from "react";
import { Trailer as TrailerProps } from "../types";
import { getActorImdbLink } from "./actor";

import "./trailer.scss";

export const Trailer = (props: { trailer: TrailerProps | null }) => {
    if (!props.trailer) return null;
    return (
        <div className="trailer">
            {props.trailer.linkEmbed && (
                <>
                    <iframe
                        className="trailerFrame"
                        src={props.trailer.linkEmbed}
                    />
                    <a
                        className="trailerLink"
                        href={props.trailer.link}
                        target="_blank"
                        rel="noopener"
                    >
                        <button>View Trailer</button>
                    </a>
                </>
            )}
            {!props.trailer.linkEmbed && (
                <p>
                    No trailer? Try clicking{" "}
                    <a
                        href={`https://www.youtube.com/results?search_query=${getActorImdbLink(
                            props.trailer.title
                        )}+trailer`}
                        target="_blank"
                        rel="noopener"
                    >
                        here
                    </a>{" "}
                    to search on YouTube!
                </p>
            )}
        </div>
    );
};
