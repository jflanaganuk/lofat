import React from "react";
import { TmdbMovieVideos } from "../types";

import "./trailer.scss";

export const Trailer = (props: { trailer: TmdbMovieVideos | null }) => {
    if (!props.trailer) return null;
    return (
        <div className="trailer">
            {props.trailer.results.length > 0 && (
                <iframe
                    title={`Trailer for ${props.trailer.results[0].name} film`}
                    className="trailerFrame"
                    src={`https://www.youtube.com/embed/${props.trailer.results[0].key}`}
                    allowFullScreen
                />
            )}
        </div>
    );
};
