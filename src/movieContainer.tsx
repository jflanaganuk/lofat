import React, { useEffect, useState } from "react";
import { BoxOfficeItem, Title } from "../types";
import { rootUrl } from "./env";
import { Movie } from "./movie";

const MovieContainer = (props: BoxOfficeItem) => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        var url = `${rootUrl}/${props.id}.json`;
        var req = new Request(url);
        fetch(req)
            .then((response) => response.json())
            .then((data) => {
                if (data.errorMessage == "") {
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
