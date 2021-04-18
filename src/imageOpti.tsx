import React, { useEffect, useState } from "react";

import "./imageOpti.scss";

type ImageOptiProps = {
    smallImg: string;
    fullImg: string;
    id: string | number | null;
    title: string;
    loadingImg?: string;
};

export const ImageOpti = (props: ImageOptiProps) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, [props.id]);
    useEffect(() => {
        setTimeout(() => {
            setLoaded(false);
        }, 1000);
    }, [loaded]);
    return (
        <a
            href={props.id ? `https://www.imdb.com/title/${props.id}` : "#"}
            target="_blank"
            rel="noopener"
            className={`movieLink ${loaded && "fadeIn"}`}
            style={{
                backgroundImage: `url(${props.fullImg}), url(${props.smallImg})`,
            }}
        >
            {`image of the poster for the film: ${props.title}`}
        </a>
    );
};
