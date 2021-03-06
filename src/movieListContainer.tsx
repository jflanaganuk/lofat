import React, { lazy, Suspense, useEffect, useState } from "react";
import {
    TmdbActorDetail,
    TmdbMovie,
    TmdbPopularMovies,
    TmdbTV,
} from "../types";

import "./imports.scss";
import "./app.scss";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { rootUrl } from "./env";

const MovieContainerLazy = lazy(() => import("./movieContainer"));

export const MovieListContainer = () => {
    const [response, setResponse] = useState<TmdbPopularMovies | null>(null);

    const listType = document.location.search.split("=")[1] || "popular";

    useEffect(() => {
        var url = `${rootUrl}/movie/${listType}`;
        var req = new Request(url);
        fetch(req)
            .then((response) => response.json())
            .then((data: TmdbPopularMovies) => {
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
    return <MovieList movies={response} listType={listType} />;
};

type MovieContainerProps = {
    movies: TmdbPopularMovies | null;
    listType: string;
};

export const MovieList = (props: MovieContainerProps) => {
    if (!props.movies) return null;
    const { id } = useParams<{ id: string }>() || { id: "" };
    const currentPos = findObjectPositionInArray(props.movies.results, id);
    const item = props.movies.results[currentPos];
    if (currentPos === -1) return <Fallback id={id} />;
    return (
        <div className={"main"}>
            <RoutedControls
                id={id}
                movies={props.movies}
                listType={props.listType}
            />
            <Suspense fallback={<p>Loading...</p>}>
                <MovieContainerLazy
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
    movies: TmdbPopularMovies;
    listType: string;
};

const RoutedControls = (props: RoutedControlsProps) => {
    const currentPosition = findObjectPositionInArray(
        props.movies.results,
        props.id
    );
    return (
        <div className="controls">
            {currentPosition > 0 && (
                <Link
                    className="previous"
                    to={`${props.movies.results[currentPosition - 1].id}?list=${
                        props.listType
                    }`}
                >
                    {"<"}
                </Link>
            )}
            {currentPosition < props.movies.results.length - 1 && (
                <Link
                    className="next"
                    to={`${props.movies.results[currentPosition + 1].id}?list=${
                        props.listType
                    }`}
                >
                    {">"}
                </Link>
            )}
        </div>
    );
};

export function findObjectPositionInArray(
    inputArray: TmdbMovie[] | TmdbTV[] | TmdbActorDetail[],
    itemToFind: string | number | boolean
): number {
    if (!itemToFind) return 0;
    return inputArray.findIndex((element) => element.id === Number(itemToFind));
}

const Fallback = (props) => {
    return (
        <div className={"main"}>
            <Suspense fallback={<p>Loading...</p>}>
                {/* @ts-ignore */}
                <MovieContainerLazy id={props.id} />
            </Suspense>
        </div>
    );
};
