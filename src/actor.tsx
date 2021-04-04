import React from "react";
import { ActorType } from "../types";

import "./actor.scss";

const noImgUrl = "https://imdb-api.com/images/original/nopicture.jpg";
const fallbackUrl =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Tpf5m-KYLPWC3JvjWq5CigAAAA%26pid%3DApi&f=1";

export const Actor = (props: ActorType) => {
    return (
        <div className="actorContainer">
            <h2>{props.asCharacter ? props.asCharacter : "Unnamed"}</h2>
            <a
                href={`https://www.imdb.com/find?q=${getActorImdbLink(
                    props.name
                )}&ref_=nv_sr_sm`}
                target="_blank"
                rel="noopener"
            >
                <div className="actorImageCircle">
                    <img
                        className="actorImage"
                        src={
                            props.image !== noImgUrl ? props.image : fallbackUrl
                        }
                        alt={`image of ${props.name} who plays ${props.asCharacter} in the film`}
                    />
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
