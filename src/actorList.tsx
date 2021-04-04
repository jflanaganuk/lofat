import React, { useEffect, useRef, useState } from "react";
import { ActorType } from "../types";
import { Actor } from "./actor";

import "./actorList.scss";

export const ActorList = (props: { actorList: ActorType[] }) => {
    const [currentActor, setCurrentActor] = useState(0);
    const actorRef = useRef(null);
    useEffect(() => {
        // @ts-ignore
        actorRef.current?.scrollTo({
            left: currentActor * actorWidth,
            behavior: "smooth",
        });
    }, [currentActor]);
    useEffect(() => {
        setCurrentActor(0);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        // @ts-ignore
        actorRef.current?.scrollTo({
            left: 0,
            behavior: "smooth",
        });
    }, [props.actorList])
    const actorAmount = props.actorList.length;
    const actorWidth = 240;
    const actorMultiplier = 3;
    const lowerBound = 0;
    const upperBound =
        actorAmount -
        window.visualViewport.width / actorWidth;
    return (
        <div className="actorListContainer">
            {currentActor > lowerBound && (
                <button
                    className="actorScrollLeft"
                    onClick={(e: any) => {
                        setCurrentActor(currentActor - actorMultiplier);
                    }}
                >
                    {"<"}
                </button>
            )}
            {currentActor < upperBound && (
                <button
                    className="actorScrollRight"
                    onClick={(e: any) => {
                        setCurrentActor(currentActor + actorMultiplier);
                    }}
                >
                    {">"}
                </button>
            )}
            <div className="actorList" ref={actorRef}>
                {props.actorList.map((actor) => {
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
        </div>
    );
};
