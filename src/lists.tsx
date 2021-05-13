import React from "react";
import { Link } from "react-router-dom";
import "./lists.scss";

export const Lists = () => {
    return (
        <div className="listContainer">
            <div className="listInner">
                <div className="listInnerSection">
                    <h2>Movies</h2>
                    <Link to="/movie/?list=popular">Popular Movies</Link>
                    <Link to="/movie/?list=top_rated">Top Rated Movies</Link>
                    <Link to="/movie/?list=now_playing">
                        Now Playing Movies
                    </Link>
                    <Link to="/movie/?list=upcoming">Upcoming Movies</Link>
                </div>
                <div className="listInnerSection">
                    <h2>TV</h2>
                    <Link to="/tv/?list=popular">Popular TV Shows</Link>
                    <Link to="/tv/?list=top_rated">Top Rated TV Shows</Link>
                    <Link to="/tv/?list=airing_today">
                        Airing Today TV Shows
                    </Link>
                    <Link to="/tv/?list=on_the_air">On The Air TV Shows</Link>
                </div>
                <div className="listInnerSection">
                    <h2>Actors</h2>
                    <Link to="/actor/">Popular Actors</Link>
                </div>
            </div>
        </div>
    );
};
