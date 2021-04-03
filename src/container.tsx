import React, { useState } from "react";
import { BoxOfficeItem } from "../types";

import "./imports.scss";
import "./app.scss";
import { MovieContainer } from "./movieContainer";

// const stubbedBoxOffice10: {
//     items: BoxOfficeItem[];
// } = require("./stubs/boxOffice10.json");

type ContainerProps = {
    movies: {items: BoxOfficeItem[]} | null;
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
            <MovieContainer
                id={item.id}
                image={item.image}
                title={item.title}
                gross={item.gross}
                rank={item.rank}
                weekend={item.weekend}
                weeks={item.weeks}
            />
        </div>
    );
};
