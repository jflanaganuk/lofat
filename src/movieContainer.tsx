import React, { useEffect, useState } from "react";
import { TmdbMovie, TmdbMovieDetail } from "../types";
import { rootUrl } from "./env";
import { Movie } from "./movie";

const MovieContainer = (props: TmdbMovie & { rank: number }) => {
    const [response, setResponse] = useState<TmdbMovieDetail | null>(null);

    useEffect(() => {
        var url = `${rootUrl}/movie/${props.id}`;
        var req = new Request(url);
        fetch(req)
            .then((response) => response.json())
            .then((data: TmdbMovieDetail) => {
                if (!data.status_message) {
                    setResponse(data);
                } else {
                    console.error("Error with returned data:");
                    console.error(data);
                }
            })
            .catch((e) => console.error(e));
    }, [props.id]);

    return <Movie movie={response} {...props} />;
};

export default MovieContainer;
