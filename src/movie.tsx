import React, { lazy, Suspense } from "react";
import { TmdbMovie, TmdbMovieDetail } from "../types";
import { imageGlobalProps } from "./env";
import { ImageOpti } from "./imageOpti";

import "./movie.scss";
import { RadarrIntegration } from "./radarrIntegration";
import { TrailerContainer } from "./trailerContainer";

const ActorListLazy = lazy(() => import("./actorListContainer"));

export const Movie = (
    props: TmdbMovie & { movie: TmdbMovieDetail | null; rank: number }
) => {
    if (!props.movie) return null;
    const image = getRealPicture(props.poster_path, props.movie.poster_path);
    return (
        <>
            <div
                className={"subContainer"}
                style={{
                    backgroundImage: `url(${getFullImagePath(
                        image,
                        imageGlobalProps.poster_sizes[6]
                    )}), url(${getFullImagePath(
                        image,
                        imageGlobalProps.poster_sizes[0]
                    )})`,
                }}
            />
            <div className={"container"}>
                <h2>{props.movie.title}</h2>
                <div className="horizontal">
                    <p>{props.movie.tagline || "\u00A0"}</p>
                </div>
                <div className={"imageAndInfo"}>
                    <ImageOpti
                        smallImg={getFullImagePath(
                            image,
                            imageGlobalProps.poster_sizes[0]
                        )}
                        fullImg={getFullImagePath(
                            image,
                            imageGlobalProps.poster_sizes[6]
                        )}
                        id={props.movie.imdb_id}
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
                                        {formatDate(props.movie.release_date)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>{props.movie.status}</td>
                                </tr>
                                <tr>
                                    <td>Total Revenue</td>
                                    <td>
                                        $
                                        {Number(
                                            props.movie.revenue
                                        ).toLocaleString()}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Genres</td>
                                    <td>
                                        {props.movie.genres.reduce(
                                            (acc, genre) => {
                                                return `${acc}${genre.name} `;
                                            },
                                            ""
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Rating</td>
                                    <td>
                                        {props.movie.vote_average
                                            ? `${props.movie.vote_average}/10`
                                            : "Not Yet Rated"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Rating Count</td>
                                    <td>
                                        {props.movie.vote_count
                                            ? `${props.movie.vote_count}`
                                            : "Not Yet Rated"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="plot">{props.movie.overview}</p>
                    </div>
                </div>
                <TrailerContainer id={props.movie.id} />
                {props.movie.id && (
                    <Suspense fallback={<p>Loading...</p>}>
                        <ActorListLazy id={props.movie.id} />
                    </Suspense>
                )}
                <div className="radarrContainer">
                    <RadarrIntegration movie={props.movie} />
                </div>
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

export function getFullImagePath(input: string, resolution: string): string {
    return `${imageGlobalProps.secure_base_url}${resolution}${input}`;
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

const getRealPicture = (
    propsPic: string | null,
    propsMoviePic: string
): string => {
    const noPicString = "nopicture.jpg";
    if (!propsMoviePic.includes(noPicString)) return propsMoviePic;
    if (propsPic && !propsPic.includes(noPicString)) return propsPic;
    return "noImageString";
};
