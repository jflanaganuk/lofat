import React from "react";
import { Link } from "react-router-dom";
import { TmdbMovieCast } from "../types";

import "./actor.scss";
import { imageGlobalProps } from "./env";
import { getFullImagePath } from "./movie";

export const noImgUrl = "https://imdb-api.com/images/original/nopicture.jpg";
export const fallbackUrl =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Tpf5m-KYLPWC3JvjWq5CigAAAA%26pid%3DApi&f=1";

export const Actor = (props: TmdbMovieCast & { offset: number }) => {
    const styleCustom = {
        "--offset": `${props.offset * 100}ms`,
    } as React.CSSProperties;
    const image = props.profile_path || noImgUrl;
    return (
        <div className="actorContainer">
            <Link to={`/actor/${props.id}`}>
                <div
                    className="actorImageCircle"
                    style={{
                        backgroundImage: `url(${
                            image !== noImgUrl
                                ? getFullImagePath(
                                      image,
                                      imageGlobalProps.profile_sizes[3]
                                  )
                                : fallbackUrl
                        }), url(
                            ${getFullImagePath(
                                image,
                                imageGlobalProps.profile_sizes[0]
                            )}
                        )`,
                        ...styleCustom,
                    }}
                >
                    {props.name}
                </div>
            </Link>
            <b>{props.name ? props.name : "Unknown"}</b>
            <p>{props.character ? props.character : "Unnamed"}</p>
        </div>
    );
};

export function convertSpacesToPlus(input: string): string {
    const lowercase = input.toLowerCase();
    const replaceSpaceWithPlus = lowercase.replace(" ", "+");
    return replaceSpaceWithPlus;
}
