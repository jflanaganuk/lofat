import React, { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { TmdbPopularActors } from "../types";
import { rootUrl } from "./env";
import { findObjectPositionInArray } from "./movieListContainer";

const ActorContainerLazy = lazy(() => import("./actorDetailContainer"));

export const ActorPopularListContainer = () => {
    const [response, setResponse] = useState<TmdbPopularActors | null>(null);

    const listType = document.location.search.split("=")[1] || "popular";

    useEffect(() => {
        const url = `${rootUrl}/person/${listType}`;
        const req = new Request(url);
        fetch(req)
            .then((response) => response.json())
            .then((data: TmdbPopularActors) => {
                if (!data.status_message) {
                    setResponse(data);
                } else {
                    console.error("Error with returned data:");
                    console.error(data);
                }
            })
            .catch((e) => console.error(e));
    }, []);

    if (!response) return null;
    return <ActorListContainerResponse actors={response} listType={listType} />;
};

type ActorListContainerResponseProps = {
    actors: TmdbPopularActors | null;
    listType: string;
};

export const ActorListContainerResponse = (
    props: ActorListContainerResponseProps
) => {
    if (!props.actors) return null;
    const { id } = useParams<{ id: string }>() || { id: "" };
    const fallbackId = String(props.actors.results[0].id);
    const actualId = id ? id : fallbackId;
    const currentPos = findObjectPositionInArray(
        props.actors.results,
        actualId
    );
    if (currentPos === -1) return <Fallback id={actualId} />;
    return (
        <div className="main">
            <RoutedControls
                id={actualId}
                actors={props.actors}
                listType={props.listType}
            />
            <Suspense fallback={<p>Loading...</p>}>
                <ActorContainerLazy id={actualId} />
            </Suspense>
        </div>
    );
};

type RoutedControlsProps = {
    id: string;
    actors: TmdbPopularActors;
    listType: string;
};

const RoutedControls = (props: RoutedControlsProps) => {
    const currentPosition = findObjectPositionInArray(
        props.actors.results,
        props.id
    );
    return (
        <div className="controls">
            {currentPosition > 0 && (
                <Link
                    className="previous"
                    to={`${props.actors.results[currentPosition - 1].id}?list=${
                        props.listType
                    }`}
                >
                    {"<"}
                </Link>
            )}
            {currentPosition < props.actors.results.length - 1 && (
                <Link
                    className="next"
                    to={`${props.actors.results[currentPosition + 1].id}?list=${
                        props.listType
                    }`}
                >
                    {">"}
                </Link>
            )}
        </div>
    );
};

const Fallback = (props) => {
    return (
        <div className={"main"}>
            <Suspense fallback={<p>Loading...</p>}>
                {/* @ts-ignore */}
                <ActorContainerLazy id={props.id} />
            </Suspense>
        </div>
    );
};
