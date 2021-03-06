import React, { lazy, Suspense, useEffect, useState } from "react";
import { TmdbPopularTV } from "../types";

import "./imports.scss";
import "./app.scss";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { rootUrl } from "./env";

import { findObjectPositionInArray } from "./movieListContainer";

const TVContainerLazy = lazy(() => import("./tvContainer"));

export const TVListContainer = () => {
    const [response, setResponse] = useState<TmdbPopularTV | null>(null);

    const listType = document.location.search.split("=")[1] || "popular";

    useEffect(() => {
        var url = `${rootUrl}/tv/${listType}`;
        var req = new Request(url);
        fetch(req)
            .then((response) => response.json())
            .then((data: TmdbPopularTV) => {
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
    return <TVList tv={response} listType={listType} />;
};

type TVContainerProps = {
    tv: TmdbPopularTV | null;
    listType: string;
};

export const TVList = (props: TVContainerProps) => {
    if (!props.tv) return null;
    const { id } = useParams<{ id: string }>() || { id: "" };
    const currentPos = findObjectPositionInArray(props.tv.results, id);
    const item = props.tv.results[currentPos];
    if (currentPos === -1) return <Fallback id={id} />;
    return (
        <div className="main">
            <RoutedControls id={id} tv={props.tv} listType={props.listType} />
            <Suspense fallback={<p>Loading...</p>}>
                <TVContainerLazy
                    poster_path={item.poster_path}
                    rank={currentPos + 1}
                    {...item}
                />
            </Suspense>
        </div>
    );
};

type RoutedControlsProps = {
    id: string;
    tv: TmdbPopularTV;
    listType: string;
};

const RoutedControls = (props: RoutedControlsProps) => {
    const currentPosition = findObjectPositionInArray(
        props.tv.results,
        props.id
    );
    return (
        <div className="controls">
            {currentPosition > 0 && (
                <Link
                    className="previous"
                    to={`${props.tv.results[currentPosition - 1].id}?list=${
                        props.listType
                    }`}
                >
                    {"<"}
                </Link>
            )}
            {currentPosition < props.tv.results.length - 1 && (
                <Link
                    className="next"
                    to={`${props.tv.results[currentPosition + 1].id}?list=${
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
        <div className="main">
            <Suspense fallback={<p>Loading...</p>}>
                {/* @ts-ignore */}
                <TVContainerLazy id={props.id} />
            </Suspense>
        </div>
    );
};
