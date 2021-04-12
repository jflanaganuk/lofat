import React from "react";
import { ActorType } from "../types";

import "./actor.scss";
import { convertAWSImage } from "./movie";

const noImgUrl = "https://imdb-api.com/images/original/nopicture.jpg";
const fallbackUrl =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Tpf5m-KYLPWC3JvjWq5CigAAAA%26pid%3DApi&f=1";

export const Actor = (props: ActorType & { offset: number }) => {
    const styleCustom = {
        "--offset": `${props.offset * 100}ms`,
    } as React.CSSProperties;
    return (
        <div className="actorContainer">
            <a
                href={`https://www.imdb.com/name/${props.id}`}
                target="_blank"
                rel="noopener"
            >
                <div
                    className="actorImageCircle"
                    style={{
                        backgroundImage: `url(${
                            props.image !== noImgUrl
                                ? convertAWSImage(props.image, 512)
                                : fallbackUrl
                        }), url(
                            ${convertAWSImage(props.image, 10)}
                        )`,
                        ...styleCustom,
                    }}
                >
                    {props.name}
                </div>
            </a>
            <b>{props.name ? props.name : "Unknown"}</b>
            <p>{props.asCharacter ? props.asCharacter : "Unnamed"}</p>
        </div>
    );
};

export function convertSpacesToPlus(input: string): string {
    const lowercase = input.toLowerCase();
    const replaceSpaceWithPlus = lowercase.replace(" ", "+");
    return replaceSpaceWithPlus;
}
