import React from "react";
import { BoxOfficeItem, Title } from "../types";
import { getActorImdbLink } from "./actor";
import { ActorList } from "./actorList";

import "./movie.scss";
import { RadarrIntegration } from "./radarrIntegration";
import { TrailerContainer } from "./trailerContainer";

export const Movie = (props: BoxOfficeItem & { movie: Title | null }) => {
    if (!props.movie) return null;
    return (
        <>
            <div
                className={"subContainer"}
                style={{
                    backgroundImage: `url(${convertAWSImage(props.image, 50)})`,
                }}
            />
            <div className={"container"}>
                <h2>{props.movie.title}</h2>
                <div className="horizontal">
                    {props.movie.fullTitle && <p>{props.movie.fullTitle}</p>}
                    {props.movie.originalTitle && (
                        <p>{`-(${props.movie.originalTitle})`}</p>
                    )}
                </div>
                <div className={"imageAndInfo"}>
                    <a
                        href={`https://www.imdb.com/find?q=${getActorImdbLink(
                            props.movie.title
                        )}&ref_=nv_sr_sm`}
                        target="_blank"
                        rel="noopener"
                    >
                        <img
                            className="movieImage"
                            src={convertAWSImage(props.movie.image, 500)}
                            alt={`image of ${props.movie.title} poster`}
                        />
                    </a>
                    <table>
                        <tbody>
                            <tr>
                                <td>Rank</td>
                                <td>{props.rank}</td>
                            </tr>
                            <tr>
                                <td>Release Date</td>
                                <td>{formatDate(props.movie.releaseDate)}</td>
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
                                <td>{props.movie.genres}</td>
                            </tr>
                            <tr>
                                <td>IMDb Rating</td>
                                <td>
                                    {props.movie.imDbRating
                                        ? `${props.movie.imDbRating}/10`
                                        : "Not Yet Rated"}
                                </td>
                            </tr>
                            <tr>
                                <td>MetaCritic Rating</td>
                                <td>
                                    {props.movie.metacriticRating
                                        ? `${props.movie.metacriticRating}/100`
                                        : "Not Yet Rated"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="plot">{props.movie.plot}</p>
                <RadarrIntegration movie={props.movie} />
                <TrailerContainer id={props.movie.id} />
                {props.movie.actorList && (
                    <ActorList actorList={props.movie.actorList} />
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
    const cutString = input.split("@")[0];
    return `${cutString}@.jpg`;
}

export function convertAWSImage(input: string, resolution: number = 1000) {
    const ratio = getRatio(input);
    const left = resolution;
    const right = Math.floor(left * ratio);
    const param = `._V1_UX${left}_CR0,50,${left},${right}.jpg`;
    const splitInput = input.split("._V1_")[0];
    return `${splitInput}${param}`;
}

export function getRatio(input: string): number {
    const startPos: number = input.search("Ratio") + 5;
    if (startPos === -1) return 1.375;
    const ratioString = input.substr(startPos, 6);
    return 1 / Number(ratioString);
}
