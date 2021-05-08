import React, { useEffect, useState } from "react";
import { TmdbTV, TmdbTVDetail } from "../types";
import { rootUrl } from "./env";
import { TV } from "./tv";

const TVContainer = (props: TmdbTV & { rank: number }) => {
    const [response, setResponse] = useState<TmdbTVDetail | null>(null);

    useEffect(() => {
        var url = `${rootUrl}/tv/${props.id}`;
        var req = new Request(url);
        fetch(req)
            .then((response) => response.json())
            .then((data: TmdbTVDetail) => {
                if (!data.status_message) {
                    setResponse(data);
                } else {
                    console.error("Error with returned data:");
                    console.error(data);
                }
            })
            .catch((e) => console.error(e));
    }, [props.id]);

    return <TV tv={response} {...props} />;
};

export default TVContainer;
