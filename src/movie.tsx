import React from "react";
import { BoxOfficeItem, Title } from "../types";
import { Actor, getActorImdbLink } from "./actor";

import "./movie.scss";

export const Movie = (props: BoxOfficeItem) => {
    const movie: Title = require(`./stubs/${props.id}.json`);
    console.log(movie);
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
                        <tbody>
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
                        </tbody>
                    </table>
                </div>
                <p>{movie.plot}</p>
                <div className="trailer">
                {movie.trailer && <video src={movie.trailer} />}
                {!movie.trailer && <p>No trailer? Try clicking <a href={`https://www.youtube.com/results?search_query=${getActorImdbLink(movie.title)}+trailer`}>here</a> to search on YouTube!</p>}
                </div>
                {movie.actorList && (
                    <div className="actorList">
                        {movie.actorList.map((actor) => {
                            return (
                                <Actor
                                    name={actor.name}
                                    id={actor.id}
                                    image={actor.image}
                                    asCharacter={actor.asCharacter}
                                    key={actor.id}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};
