import React, { lazy, Suspense } from "react";
import { TmdbTV, TmdbTVDetail } from "../types";
import { imageGlobalProps } from "./env";
import { ImageOpti } from "./imageOpti";
import { formatDate, getFullImagePath, getRealPicture } from "./movie";
import { TrailerContainer } from "./trailerContainer";

import "./movie.scss";
import { RadarrIntegration } from "./radarrIntegration";

const ActorListLazy = lazy(() => import("./actorListContainer"));

export const TV = (
    props: TmdbTV & { tv: TmdbTVDetail | null; rank: number }
) => {
    if (!props.tv) return null;
    const image = getRealPicture(props.poster_path, props.tv.poster_path!);
    return (
        <>
            <div
                className="subContainer"
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
            <div className="container">
                <h2>{props.tv.name}</h2>
                <div className="horizontal">
                    <p>{props.tv.tagline || "\u00A0"}</p>
                </div>
                <div className="imageAndInfo">
                    <ImageOpti
                        smallImg={getFullImagePath(
                            image,
                            imageGlobalProps.poster_sizes[0]
                        )}
                        fullImg={getFullImagePath(
                            image,
                            imageGlobalProps.poster_sizes[6]
                        )}
                        id={null}
                        title={props.tv.name}
                        kind="title"
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
                                    <td>First Air Date</td>
                                    <td>
                                        {formatDate(props.tv.first_air_date)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Last Air Date</td>
                                    <td>
                                        {formatDate(props.tv.last_air_date)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>{props.tv.status}</td>
                                </tr>
                                <tr>
                                    <td>Genres</td>
                                    <td>
                                        {props.tv.genres.reduce(
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
                                        {props.tv.vote_average
                                            ? `${props.tv.vote_average}/10`
                                            : "Not Yet Rated"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Rating Count</td>
                                    <td>
                                        {props.tv.vote_count
                                            ? `${props.tv.vote_count}`
                                            : "Not Yet Rated"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="plot">{props.tv.overview}</p>
                    </div>
                </div>
                <TrailerContainer id={props.tv.id} kind="tv" />
                {props.tv.id && (
                    <Suspense fallback={<p>Loading...</p>}>
                        <ActorListLazy id={props.tv.id} kind="tv" />
                    </Suspense>
                )}
                <RadarrIntegration name={props.tv.name} kind="tv" />
            </div>
        </>
    );
};
