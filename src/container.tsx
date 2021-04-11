import React, { lazy, Suspense } from "react";
import { BoxOfficeItem } from "../types";

import "./imports.scss";
import "./app.scss";
import { GithubLink } from "./githubLink";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const MovieContainerLazy = lazy(() => import("./movieContainer"));

type ContainerProps = {
    movies: { items: BoxOfficeItem[] } | null;
};

export const Container = (props: ContainerProps) => {
    if (!props.movies) return null;
    const { id } = useParams<{ id: string }>() || "";
    const currentPos = findObjectPositionInArray(props.movies.items, id);
    const item = props.movies.items[currentPos];
    if (currentPos === -1) return <Fallback id={id} />;
    return (
        <div className={"main"}>
            <RoutedControls id={id} movies={props.movies} />
            <Suspense fallback={<p>Loading...</p>}>
                <MovieContainerLazy
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    gross={item.gross}
                    rank={item.rank}
                    weekend={item.weekend}
                    weeks={item.weeks}
                />
            </Suspense>
            <GithubLink />
        </div>
    );
};

type RoutedControlsProps = {
    id: string;
    movies: { items: BoxOfficeItem[] };
};

const RoutedControls = (props: RoutedControlsProps) => {
    const currentPosition = findObjectPositionInArray(
        props.movies.items,
        props.id
    );
    return (
        <div className="controls">
            {currentPosition > 0 && (
                <Link
                    className="previous"
                    to={`${props.movies.items[currentPosition - 1].id}`}
                >
                    GO BACK
                </Link>
            )}
            {currentPosition < props.movies.items.length - 1 && (
                <Link
                    className="next"
                    to={`${props.movies.items[currentPosition + 1].id}`}
                >
                    GO FORWARD
                </Link>
            )}
        </div>
    );
};

function findObjectPositionInArray(
    inputArray: BoxOfficeItem[],
    itemToFind: string | number | boolean
): number {
    if (!itemToFind) return 0;
    return inputArray.findIndex((element) => element.id === itemToFind);
}

const Fallback = (props) => {
    return (
        <div className={"main"}>
            <Suspense fallback={<p>Loading...</p>}>
                <MovieContainerLazy id={props.id} />
            </Suspense>
            <GithubLink />
        </div>
    );
};
