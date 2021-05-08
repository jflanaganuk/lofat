import React, { useEffect, useState } from "react";
import { TmdbMovieVideos } from "../types";

import "./trailer.scss";

export const Trailer = (props: { trailer: TmdbMovieVideos | null }) => {
    if (!props.trailer) return null;
    if (!props.trailer.results) return null;
    const [currentTrailer, setCurrentTrailer] = useState(0);
    useEffect(() => {
        setCurrentTrailer(0);
    }, [props.trailer.results]);
    return (
        <div className="trailer">
            {props.trailer.results.length > 0 && (
                <iframe
                    title={`Trailer for ${props.trailer.results[currentTrailer]?.name} film`}
                    className="trailerFrame"
                    src={`https://www.youtube.com/embed/${props.trailer.results[currentTrailer]?.key}`}
                    allowFullScreen
                />
            )}
            {props.trailer.results.length > 1 && (
                <div className="trailerButtonContainer">
                    {props.trailer.results.slice(0, 4).map((result, index) => {
                        return (
                            <button
                                className={`trailerButton ${
                                    index === currentTrailer
                                        ? "trailerButtonActive"
                                        : ""
                                }`}
                                key={result.id}
                                onClick={() => setCurrentTrailer(index)}
                                disabled={index === currentTrailer}
                            >
                                {result.name.length > 30
                                    ? result.name.substring(0, 30) + "..."
                                    : result.name}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
