import React from "react";
import { BoxOfficeItem, Title } from "../types";
import { Actor, getActorImdbLink } from "./actor";

import "./movie.scss";

export const Movie = (props: BoxOfficeItem) => {
    const movie: Title = require(`./stubs/${props.id}.json`);
    return (
        <>
            <div
                className={"subContainer"}
                style={{ backgroundImage: `url(${movie.image})` }}
            />
            <div className={"container"}>
                <h2>{movie.title}</h2>
                <div className="horizontal">
                {movie.fullTitle && <p>{movie.fullTitle}</p>}
                {movie.originalTitle && <p>{`-(${movie.originalTitle})`}</p>}
                </div>
                <div className={"imageAndInfo"}>
                    <a
                        href={`https://www.imdb.com/find?q=${getActorImdbLink(
                            movie.title
                        )}&ref_=nv_sr_sm`}
                    >
                        <img className="movieImage" src={movie.image} onError={(e: any) => e.target.src = props.image}/>
                    </a>
                    <table>
                        <tbody>
                            <tr>
                                <td>Rank</td>
                                <td>{props.rank}</td>
                            </tr>
                            <tr>
                                <td>Release Date</td>
                                <td>{formatDate(movie.releaseDate)}</td>
                            </tr>
                            <tr>
                                <td>Weeks in Box Office</td>
                                <td>{props.weeks}</td>
                            </tr>
                            <tr>
                                <td>Opening Weekend</td>
                                <td>{props.weekend}</td>
                            </tr>
                            <tr>
                                <td>Genre</td>
                                <td>{movie.genres}</td>
                            </tr>
                            <tr>
                                <td>IMDb Rating</td>
                                <td>
                                    {movie.imDbRating
                                        ? `${movie.imDbRating}/10`
                                        : "Not Yet Rated"}
                                </td>
                            </tr>
                            <tr>
                                <td>MetaCritic Rating</td>
                                <td>
                                    {movie.metacriticRating
                                        ? `${movie.metacriticRating}/100`
                                        : "Not Yet Rated"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="plot">{movie.plot}</p>
                <div className="trailer">
                    {movie.trailer && <video src={movie.trailer} />}
                    {!movie.trailer && (
                        <p>
                            No trailer? Try clicking{" "}
                            <a
                                href={`https://www.youtube.com/results?search_query=${getActorImdbLink(
                                    movie.title
                                )}+trailer`}
                            >
                                here
                            </a>{" "}
                            to search on YouTube!
                        </p>
                    )}
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

export function formatDate(input: string): string {
    const date: Date = new Date(input);
    const toLocale = date.toLocaleDateString();
    return toLocale;
}

export function getFullSizeImg(input: string): string {
    const cutString = input.split('@')[0];
    return `${cutString}@.jpg`
}
