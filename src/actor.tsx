import React from "react";
import { ActorType } from "../types";

import "./actor.scss";

const noImgUrl = "https://imdb-api.com/images/original/nopicture.jpg";
const fallbackUrl =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Tpf5m-KYLPWC3JvjWq5CigAAAA%26pid%3DApi&f=1";

export const Actor = (props: ActorType) => {
    return (
        <div className="actorContainer">
            <h3>{props.name ? props.name : "Unknown"}</h3>
            <a
                href={`https://www.imdb.com/find?q=${getActorImdbLink(
                    props.name
                )}&ref_=nv_sr_sm`}
                target="_blank"
                rel="noopener"
            >
                <div
                    className="actorImageCircle"
                    style={{
                        backgroundImage: `url(${
                            props.image !== noImgUrl ? props.image : fallbackUrl
                        })`,
                    }}
                >
                    {props.name}
                </div>
            </a>
            <p>{props.asCharacter ? props.asCharacter : "Unnamed"}</p>
        </div>
    );
};

export function getActorImdbLink(input: string): string {
    const lowercase = input.toLowerCase();
    const replaceSpaceWithPlus = lowercase.replace(" ", "+");
    return replaceSpaceWithPlus;
}
