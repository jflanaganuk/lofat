import React from "react";
import { ActorType } from "../types";

import "./actor.scss";

export const Actor = (props: ActorType) => {
    return (
        <div className="actorContainer">
            <h2>{props.asCharacter ? props.asCharacter : "Unnamed"}</h2>
            <a
                href={`https://www.imdb.com/find?q=${getActorImdbLink(
                    props.name
                )}&ref_=nv_sr_sm`}
                target="_blank"
            >
                <div className="actorImageCircle">
                    <img className="actorImage" src={props.image} />
                </div>
            </a>
            <p>{props.name ? props.name : "Unknown"}</p>
        </div>
    );
};

export function getActorImdbLink(input: string): string {
    const lowercase = input.toLowerCase();
    const replaceSpaceWithPlus = lowercase.replace(" ", "+");
    return replaceSpaceWithPlus;
}
