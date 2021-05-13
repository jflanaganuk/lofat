import React, { lazy, Suspense } from "react";
import { TmdbActorDetail } from "../types";
import { imageGlobalProps } from "./env";
import { ImageOpti } from "./imageOpti";
import { formatDate, getFullImagePath } from "./movie";

import "./movie.scss";
import "./app.scss";

const ActorDetailKnownForLazy = lazy(() => import("./actorDetailKnownFor"));
interface ActorDetailProps {
    actor: TmdbActorDetail | null;
}

export const ActorDetail = (props: ActorDetailProps) => {
    if (!props.actor) return null;
    const image = props.actor.profile_path || "";
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
                <h2>{props.actor.name}</h2>
                <div className="horizontal">
                    <p>{props.actor.place_of_birth || "\u00A0"}</p>
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
                        id={props.actor.imdb_id}
                        title={props.actor.name}
                        kind="name"
                    />
                    <div className="vertical">
                        <table>
                            <tbody>
                                {props.actor.popularity && (
                                    <tr>
                                        <td>Popularity</td>
                                        <td>{props.actor.popularity}</td>
                                    </tr>
                                )}
                                {props.actor.birthday && (
                                    <tr>
                                        <td>Birth Date</td>
                                        <td>
                                            {formatDate(props.actor.birthday)}
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td>Status</td>
                                    <td>
                                        {!props.actor.deathday
                                            ? "Alive"
                                            : "Deceased"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>
                                        {props.actor.gender === 2
                                            ? "Male"
                                            : "Female"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Known For</td>
                                    <td>{props.actor.known_for_department}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="plot">{props.actor.biography}</p>
                    </div>
                </div>
                {/* <ActorDetailGallery/> */}
                {props.actor.id && (
                    <Suspense fallback={<p>Loading...</p>}>
                        <ActorDetailKnownForLazy id={props.actor.id} />
                    </Suspense>
                )}
            </div>
        </>
    );
};
