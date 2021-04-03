import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BoxOfficeItem } from "../types";
import { Movie } from "./movie";

import "./imports.scss";
import "./app.scss";

const stubbedBoxOffice10: {
    items: BoxOfficeItem[];
} = require("./stubs/boxOffice10.json");

const App = () => {
    const [currentMovie, setCurrentMovie] = useState(0);
    const item = stubbedBoxOffice10.items[currentMovie];
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
                {currentMovie < stubbedBoxOffice10.items.length - 1 && (
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
            <Movie
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

ReactDOM.render(<App />, document.getElementById("root"));
