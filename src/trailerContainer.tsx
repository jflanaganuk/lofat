import React, { useEffect, useState } from "react";
import { TmdbMovieVideos } from "../types";
import { rootUrl } from "./env";
import { Trailer } from "./trailer";

export const TrailerContainer = (props: { id: string | number }) => {
    const [response, setResponse] = useState<TmdbMovieVideos | null>(null);

    useEffect(() => {
        var url = `${rootUrl}/movie/${props.id}/videos`;
        var req = new Request(url);
        fetch(req)
            .then((response) => response.json())
            .then((data: TmdbMovieVideos) => {
                if (!data.status_message) {
                    setResponse(data);
                } else {
                    console.error("Error with returned data:");
                    console.error(data);
                }
            })
            .catch((e) => console.error(e));
    }, [props.id]);

    return <Trailer trailer={response} />;
};
