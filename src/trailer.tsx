import React from "react";
import { YouTubeTrailer } from "../types";
import { convertSpacesToPlus } from "./actor";

import "./trailer.scss";

export const Trailer = (props: { trailer: YouTubeTrailer | null }) => {
    if (!props.trailer) return null;
    return (
        <div className="trailer">
            {props.trailer.videoId && (
                <iframe
                    title={`Trailer for ${props.trailer.title} film`}
                    className="trailerFrame"
                    src={`https://www.youtube.com/embed/${props.trailer.videoId}`}
                    allowFullScreen
                />
            )}
            {!props.trailer.videoId && (
                <p>
                    No trailer? Try clicking{" "}
                    <a
                        href={`https://www.youtube.com/results?search_query=${convertSpacesToPlus(
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
