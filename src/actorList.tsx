import React, { useEffect, useRef, useState } from "react";
import { TmdbMovieCredits } from "../types";
import { Actor } from "./actor";

import "./actorList.scss";

const ActorList = (props: { actorList: TmdbMovieCredits | null }) => {
    const actorRef = useRef<HTMLDivElement>(null);
    const [scroll, setScroll] = useState(1);
    const [actorMax, setActorMax] = useState(10);
    useEffect(() => {
        /*
         *  For some reason react does not like showing the buttons
         *  when state begins as 0, so there is a small delay here
         *  to force it to update once.
         */
        setTimeout(() => {
            setScroll(0);
        }, 100);
    }, []);
    useEffect(() => {
        !is_touch_enabled() &&
            actorRef.current?.scrollTo({ left: scroll, behavior: "smooth" });
    }, [scroll]);
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        actorRef.current?.scrollTo({
            left: 0,
            behavior: "smooth",
        });
    }, [props.actorList]);
    const length =
        (actorRef.current?.scrollWidth || 0) -
        (actorRef.current?.clientWidth || 0);
    return (
        <div className="actorListContainer">
            {!is_touch_enabled() && (
                <div className="buttonContainer">
                    <button
                        className="actorScrollLeft"
                        disabled={scroll <= 0}
                        onClick={() => {
                            setScroll(
                                scroll - (actorRef.current?.clientWidth || 0)
                            );
                        }}
                    >
                        {"<"}
                    </button>
                    <button
                        className="actorScrollRight"
                        onClick={() => {
                            setScroll(
                                scroll + (actorRef.current?.clientWidth || 0)
                            );
                            setActorMax(props.actorList?.cast.length || 0);
                        }}
                        disabled={scroll >= length}
                    >
                        {">"}
                    </button>
                </div>
            )}
            <div
                className="actorList"
                ref={actorRef}
                onScroll={(e: any) => setScroll(e.target.scrollLeft)}
            >
                {props.actorList &&
                    props.actorList.cast
                        .slice(0, actorMax)
                        .map((actor, index) => {
                            return (
                                <Actor
                                    profile_path={actor.profile_path}
                                    key={actor.id}
                                    offset={index}
                                    {...actor}
                                />
                            );
                        })}
            </div>
        </div>
    );
};

function is_touch_enabled() {
    return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
}

export default ActorList;
