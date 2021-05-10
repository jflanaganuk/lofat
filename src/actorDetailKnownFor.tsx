import React, { useEffect, useRef, useState } from "react";
import { TmdbActorCredits, TmdbActorCreditsCast } from "../types";
import { imageGlobalProps, rootUrl } from "./env";

import { noImgUrl, fallbackUrl } from "./actor";

import "./actorList.scss";
import "./search.scss";
import { Link } from "react-router-dom";
import { getFullImagePath } from "./movie";

// @ts-ignore
import TVSvg from "./tv.svg";
// @ts-ignore
import MovieSvg from "./film.svg";

type ActorDetailKnownForContainerProps = {
    id: number;
};

const ActorDetailKnownForContainer = (
    props: ActorDetailKnownForContainerProps
) => {
    const [response, setResponse] = useState<TmdbActorCredits | null>(null);

    useEffect(() => {
        const url = `${rootUrl}/person/${props.id}/combined_credits`;
        const req = new Request(url);
        fetch(req)
            .then((response) => response.json())
            .then((data: TmdbActorCredits) => {
                if (!data.status_message) {
                    setResponse(data);
                } else {
                    console.error("Error with returned data:");
                    console.error(data);
                }
            })
            .catch((e) => console.error(e));
    }, [props.id]);
    if (!response) return null;
    return <ActorDetailKnownFor entities={response} />;
};

const ActorDetailKnownFor = (props: { entities: TmdbActorCredits | null }) => {
    const actorRef = useRef<HTMLDivElement>(null);
    const [scroll, setScroll] = useState(1);
    const [actorMax, setActorMax] = useState(10);
    useEffect(() => {
        /*
         *  For some reason react does not like showing the buttons
         *  when state begins as 0, so there is a small delay here
         *  to force it to update once.
         */
        setTimeout(() => {
            setScroll(0);
        }, 100);
    }, []);
    useEffect(() => {
        !is_touch_enabled() &&
            actorRef.current?.scrollTo({ left: scroll, behavior: "smooth" });
    }, [scroll]);
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        actorRef.current?.scrollTo({
            left: 0,
            behavior: "smooth",
        });
    }, [props.entities]);
    const length =
        (actorRef.current?.scrollWidth || 0) -
        (actorRef.current?.clientWidth || 0);
    return (
        <div className="actorListContainer">
            {!is_touch_enabled() && (
                <div className="buttonContainer">
                    <button
                        className="actorScrollLeft"
                        disabled={scroll <= 0}
                        onClick={() => {
                            setScroll(
                                scroll - (actorRef.current?.clientWidth || 0)
                            );
                        }}
                    >
                        {"<"}
                    </button>
                    <button
                        className="actorScrollRight"
                        onClick={() => {
                            setScroll(
                                scroll + (actorRef.current?.clientWidth || 0)
                            );
                            setActorMax(props.entities?.cast.length || 0);
                        }}
                        disabled={scroll >= length}
                    >
                        {">"}
                    </button>
                </div>
            )}
            <div
                className="actorList"
                ref={actorRef}
                onScroll={(e: any) => setScroll(e.target.scrollLeft)}
            >
                {props.entities &&
                    props.entities.cast
                        .filter((credit) => {
                            if (
                                credit.genre_ids.includes(10763) ||
                                credit.genre_ids.includes(10767)
                            )
                                return false;
                            return true;
                        })
                        .sort((a, b) => {
                            return b.popularity - a.popularity;
                        })
                        .slice(0, actorMax)
                        .map((entity, index) => {
                            return (
                                <ActorDetailKnownForEntity
                                    key={entity.id}
                                    offset={index}
                                    {...entity}
                                />
                            );
                        })}
            </div>
        </div>
    );
};

export const ActorDetailKnownForEntity = (
    props: TmdbActorCreditsCast & { offset: number }
) => {
    const styleCustom = {
        "--offset": `${props.offset * 100}ms`,
    } as React.CSSProperties;
    const image = props.poster_path || noImgUrl;
    const title = props.title || props.name;
    return (
        <div className="actorContainer">
            <Link to={`/${props.media_type}/${props.id}`}>
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
            <b>
                {title ? title : "Unknown"}{" "}
                {props.media_type === "movie" ? (
                    <MovieSvg className="movieSvgSmall" />
                ) : (
                    <TVSvg className="tvSvgSmall" />
                )}
            </b>
            <p>{props.character ? props.character : "Unnamed"}</p>
        </div>
    );
};

function is_touch_enabled() {
    return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
}

export default ActorDetailKnownForContainer;
