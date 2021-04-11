import React, { lazy, Suspense } from "react";
import { BoxOfficeItem, Title } from "../types";
import { ImageOpti } from "./imageOpti";

import "./movie.scss";
import { RadarrIntegration } from "./radarrIntegration";
import { TrailerContainer } from "./trailerContainer";

const ActorListLazy = lazy(() => import("./actorList"));

export const Movie = (props: BoxOfficeItem & { movie: Title | null }) => {
    if (!props.movie) return null;
    return (
        <>
            <div
                className={"subContainer"}
                style={{
                    backgroundImage: `url(${convertAWSImage(
                        props.movie.image,
                        50
                    )}), url(${convertAWSImage(props.movie.image, 8)})`,
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
                    <ImageOpti
                        smallImg={convertAWSImage(props.movie.image, 8)}
                        fullImg={convertAWSImage(props.movie.image, 500)}
                        id={props.id}
                        title={props.movie.title}
                    />
                    <div className="vertical">
                        <table>
                            <tbody>
                                {props.rank && (
                                    <tr>
                                        <td>Rank</td>
                                        <td>{props.rank}</td>
                                    </tr>
                                )}
                                <tr>
                                    <td>Release Date</td>
                                    <td>
                                        {formatDate(props.movie.releaseDate)}
                                    </td>
                                </tr>
                                {props.weeks && (
                                    <tr>
                                        <td>Weeks in Box Office</td>
                                        <td>{props.weeks}</td>
                                    </tr>
                                )}
                                {props.weekend && (
                                    <tr>
                                        <td>Opening Weekend</td>
                                        <td>{props.weekend}</td>
                                    </tr>
                                )}
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
                        <p className="plot">{props.movie.plot}</p>
                    </div>
                </div>
                <div className="radarrContainer">
                    <RadarrIntegration movie={props.movie} />
                </div>
                <TrailerContainer id={props.movie.id} />
                {props.movie.actorList && (
                    <Suspense fallback={<p>Loading...</p>}>
                        <ActorListLazy actorList={props.movie.actorList} />
                    </Suspense>
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
    const left = ratio > 1 ? resolution : resolution * 3;
    const right =
        ratio > 1
            ? Math.floor(resolution * ratio)
            : Math.floor(resolution * ratio) * 3;
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
