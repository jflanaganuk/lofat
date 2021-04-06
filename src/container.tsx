import React, { lazy, Suspense, useState } from "react";
import { BoxOfficeItem } from "../types";

import "./imports.scss";
import "./app.scss";
import { GithubLink } from "./githubLink";

const MovieContainerLazy = lazy(() => import("./movieContainer"));

type ContainerProps = {
    movies: { items: BoxOfficeItem[] } | null;
};

export const Container = (props: ContainerProps) => {
    if (!props.movies) return null;
    const [currentMovie, setCurrentMovie] = useState(0);
    const item = props.movies.items[currentMovie];
    return (
        <div className={"main"}>
            <div className="controls">
                {currentMovie > 0 && (
                    <button
                        className="previous"
                        onClick={() => {
                            setCurrentMovie(currentMovie - 1);
                        }}
                    >
                        GO BACK
                    </button>
                )}
                {currentMovie < props.movies.items.length - 1 && (
                    <button
                        className="next"
                        onClick={() => {
                            setCurrentMovie(currentMovie + 1);
                        }}
                    >
                        GO FORWARD
                    </button>
                )}
            </div>
            <Suspense fallback={() => <p>Loading...</p>}>
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
