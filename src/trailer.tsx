import React, { useEffect, useState } from "react";
import { TmdbMovieVideos } from "../types";

import "./trailer.scss";

export const Trailer = (props: { trailer: TmdbMovieVideos | null }) => {
    if (!props.trailer) return null;
    if (!props.trailer.results) return null;
    const [currentTrailer, setCurrentTrailer] = useState(0);
    useEffect(() => {
        setCurrentTrailer(0);
    }, [props.trailer.results])
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
                    {props.trailer.results.map((result, index) => {
                        return (
                            <button
                                className="trailerButton"
                                key={result.id}
                                onClick={() => setCurrentTrailer(index)}
                            >
                                {result.name} - {result.type}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
