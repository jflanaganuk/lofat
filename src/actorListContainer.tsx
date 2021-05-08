import React, { useEffect, useState } from "react";
import { TmdbMovieCredits } from "../types";
import ActorList from "./actorList";
import { rootUrl } from "./env";

const ActorListContainer = (props: {
    id: string | number;
    kind: "movie" | "tv";
}) => {
    const [response, setResponse] = useState<TmdbMovieCredits | null>(null);

    useEffect(() => {
        var url = `${rootUrl}/${props.kind}/${props.id}/credits`;
        var req = new Request(url);
        fetch(req)
            .then((response) => response.json())
            .then((data: TmdbMovieCredits) => {
                if (!data.status_message) {
                    setResponse(data);
                } else {
                    console.error("Error with returned data: ");
                    console.error(data);
                }
            })
            .catch((e) => console.error(e));
    }, [props.id]);

    return <ActorList actorList={response} />;
};

export default ActorListContainer;
