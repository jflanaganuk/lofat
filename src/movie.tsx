import React from "react";
import { BoxOfficeItem, Title } from "../types";

import "./movie.scss";

export const Movie = (props: BoxOfficeItem) => {
    const movie: Title = require(`./stubs/${props.id}.json`);
    console.log(movie.trailer)
    return (
        <>
            <div
                className={"subContainer"}
                style={{ backgroundImage: `url(${movie.image})` }}
            />
            <div className={"container"}>
                <div className="horizontal">
                    <h2>{movie.title}</h2>
                    {movie.fullTitle && <p>&nbsp;{` - ${movie.fullTitle}`}</p>}
                    {movie.originalTitle && (
                        <p>&nbsp;{` - ${movie.originalTitle}`}</p>
                    )}
                </div>
                <div className={"imageAndInfo"}>
                    <img src={props.image} />
                    <table>
                        <tr>
                            <td>Rank</td>
                            <td>:</td>
                            <td>{props.rank}</td>
                        </tr>
                        <tr>
                            <td>Weekend</td>
                            <td>:</td>
                            <td>{props.weekend}</td>
                        </tr>
                        <tr>
                            <td>Weeks</td>
                            <td>:</td>
                            <td>{props.weeks}</td>
                        </tr>
                    </table>
                </div>
                {movie.trailer && <video src={movie.trailer}/>}
                <p>{movie.plot}</p>
            </div>
        </>
    );
};
