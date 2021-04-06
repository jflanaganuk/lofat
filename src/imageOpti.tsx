import React, { useState } from 'react';

import './imageOpti.scss';

type ImageOptiProps = {
    smallImg: string;
    fullImg: string;
    id: string;
    title: string;
    loadingImg?: string;
}

export const ImageOpti = (props: ImageOptiProps) => {
    return (
        <a
            href={`https://www.imdb.com/title/${props.id}`}
            target="_blank"
            rel="noopener"
            className="movieLink"
            style={{
                backgroundImage: `url(${props.fullImg}), url(${props.smallImg})`,
            }}
        >
            {`image of the poster for the film: ${props.title}`}
        </a>
    )
}
