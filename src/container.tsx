import React, { lazy, Suspense } from "react";
import { TmdbMovie, TmdbPopularMovies } from "../types";

import "./imports.scss";
import "./app.scss";
import { GithubLink } from "./githubLink";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Attribution } from "./attribution";

const MovieContainerLazy = lazy(() => import("./movieContainer"));

type ContainerProps = {
    movies: TmdbPopularMovies | null;
};

export const Container = (props: ContainerProps) => {
    if (!props.movies) return null;
    const { id } = useParams<{ id: string }>() || "";
    const currentPos = findObjectPositionInArray(props.movies.results, id);
    const item = props.movies.results[currentPos];
    console.log(currentPos, props.movies.results, id);
    if (currentPos === -1) return <Fallback id={id} />;
    return (
        <div className={"main"}>
            <RoutedControls id={id} movies={props.movies} />
            <Suspense fallback={<p>Loading...</p>}>
                <MovieContainerLazy
                    poster_path={item.poster_path}
                    rank={currentPos + 1}
                    {...item}
                />
            </Suspense>
            <GithubLink />
            <Attribution />
        </div>
    );
};

type RoutedControlsProps = {
    id: string;
    movies: TmdbPopularMovies;
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
                    to={`${props.movies.results[currentPosition - 1].id}`}
                >
                    {"<"}
                </Link>
            )}
            {currentPosition < props.movies.results.length - 1 && (
                <Link
                    className="next"
                    to={`${props.movies.results[currentPosition + 1].id}`}
                >
                    {">"}
                </Link>
            )}
        </div>
    );
};

function findObjectPositionInArray(
    inputArray: TmdbMovie[],
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
            <GithubLink />
        </div>
    );
};
