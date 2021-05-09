import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { TmdbActorDetail } from "../types";
import { ActorDetail } from "./actorDetail";
import { rootUrl } from "./env";

export const ActorDetailContainer = () => {
    const { id } = useParams<{ id: string }>() || { id: "" };
    const [response, setResponse] = useState<TmdbActorDetail | null>(null);

    useEffect(() => {
        const url = `${rootUrl}/person/${id}`;
        const req = new Request(url);
        fetch(req)
            .then((response) => response.json())
            .then((data: TmdbActorDetail) => {
                if (!data.status_message) {
                    setResponse(data);
                } else {
                    console.error("Error with returned data:");
                    console.error(data);
                }
            })
            .catch((e) => console.error(e));
    }, [id]);

    if (!response) return null;
    return <ActorDetail actor={response} />;
};
