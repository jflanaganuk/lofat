import React from "react";

type KnownSvgs = "left-arrow";

export const SVG = (props: { src: KnownSvgs; className?: string }) => {
    const svg = require(`../images/${props.src}.svg`);
    return <div className={props.className}>{svg}</div>;
};
