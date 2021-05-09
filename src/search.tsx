import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    TmdbMovieSearchResult,
    TmdbTVSearchResult,
    TmdbPersonSearchResult,
    TmdbMultiSearchResults,
} from "../types";
import { imageGlobalProps, rootUrl } from "./env";
import { formatDate, getFullImagePath } from "./movie";

import { fallbackUrl } from "./actor";

import "./search.scss";
// @ts-ignore
import TVSvg from "./tv.svg";
// @ts-ignore
import MovieSvg from "./film.svg";
// @ts-ignore
import PersonSvg from "./person.svg";

enum Status {
    Idle = "Idle",
    Pending = "Pending",
    Success = "Success",
    Error = "Error",
}

interface SearchProps {
    hideTitle?: boolean;
}

export const Search = (props: SearchProps) => {
    const [status, setStatus] = useState(Status.Idle);
    const [results, setResults] = useState<TmdbMultiSearchResults | null>(null);

    const val = document.location.search.split("=")[1];
    useEffect(() => {
        if (val) {
            setStatus(Status.Pending);
            const url = `${rootUrl}/search/multi?query=${val}`;
            const req = new Request(url);
            fetch(req)
                .then((response) => response.json())
                .then((data: TmdbMultiSearchResults) => {
                    if (!data.status_message) {
                        setStatus(Status.Success);
                        setResults(data);
                    } else {
                        console.error("Error with returned data: ");
                        console.error(data);
                    }
                })
                .catch((e) => {
                    setStatus(Status.Error);
                    console.error(e);
                });
        }
    }, []);

    const submitForm = (form) => {
        form.preventDefault();
        const val = form.target.elements.searchInput.value;
        if (status !== Status.Pending) submitRequest(val);
    };

    const submitInput = (input) => {
        const val = input.target.value;
        if (status !== Status.Pending) submitRequest(val);
    };

    const submitRequest = (val: string) => {
        document.location.href = `/imdbfetch/search?query=${val}`;
    };

    return (
        <form className="searchContainer" onSubmit={submitForm}>
            <div className="searchSticky">
                {!props.hideTitle && <h2>Search</h2>}
                <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    onBlur={(e) => {
                        if (
                            e.target.value !== sanitiseVal(val) &&
                            e.target.value !== ""
                        ) {
                            submitInput(e);
                        }
                    }}
                    defaultValue={sanitiseVal(val)}
                    autoFocus={true}
                />
            </div>
            {status === Status.Pending && <p>Loading...</p>}
            {results && (
                <div className="searchResultContainer">
                    {results.results.map((result) => {
                        if (result.media_type === "movie")
                            return (
                                <SearchResult
                                    result={result as TmdbMovieSearchResult}
                                />
                            );
                        if (result.media_type === "tv")
                            return (
                                <SearchResultTV
                                    result={result as TmdbTVSearchResult}
                                />
                            );
                        if (
                            result.media_type === "person" &&
                            result.known_for_department === "Acting" &&
                            result.popularity > 1
                        )
                            return (
                                <SearchResultPerson
                                    result={result as TmdbPersonSearchResult}
                                />
                            );
                    })}
                </div>
            )}
        </form>
    );
};

function sanitiseVal(input: string): string {
    if (!input) return "";
    return input.replace(/\%20/g, " ");
}

const SearchResult = (props: { result: TmdbMovieSearchResult }) => {
    const { result } = props;
    return (
        <Link
            key={result.id}
            className="searchResult"
            to={`/movie/${result.id}`}
        >
            {result.poster_path && (
                <img
                    src={getFullImagePath(
                        result.poster_path || "",
                        imageGlobalProps.poster_sizes[0]
                    )}
                    alt={`poster of ${result.title}`}
                />
            )}
            {!result.poster_path && (
                <img src={fallbackUrl} alt="no image found" />
            )}
            <div className="searchResultVertical">
                {result.title.length > 15 && (
                    <h2>{result.title.substring(0, 10)}...</h2>
                )}
                {result.title.length <= 15 && <h2>{result.title}</h2>}
                <small>{formatDate(result.release_date)}</small>
                <MovieSvg className="movieSvg" />
                {result.overview.length > 60 && (
                    <p>{result.overview.substring(0, 55)}...</p>
                )}
                {result.overview.length <= 60 && <p>{result.overview}</p>}
            </div>
        </Link>
    );
};

const SearchResultTV = (props: { result: TmdbTVSearchResult }) => {
    const { result } = props;
    return (
        <Link key={result.id} className="searchResult" to={`/tv/${result.id}`}>
            {result.poster_path && (
                <img
                    src={getFullImagePath(
                        result.poster_path || "",
                        imageGlobalProps.poster_sizes[0]
                    )}
                    alt={`poster of ${result.name}`}
                />
            )}
            {!result.poster_path && (
                <img src={fallbackUrl} alt="no image found" />
            )}
            <div className="searchResultVertical">
                {result.name.length > 15 && (
                    <h2>{result.name.substring(0, 10)}...</h2>
                )}
                {result.name.length <= 15 && <h2>{result.name}</h2>}
                <small>{formatDate(result.first_air_date)}</small>
                <TVSvg className="tvSvg" />
                {result.overview.length > 60 && (
                    <p>{result.overview.substring(0, 55)}...</p>
                )}
                {result.overview.length <= 60 && <p>{result.overview}</p>}
            </div>
        </Link>
    );
};

const SearchResultPerson = (props: { result: TmdbPersonSearchResult }) => {
    const { result } = props;
    return (
        <Link
            key={result.id}
            className="searchResult"
            to={`/actor/${result.id}`}
        >
            {result.profile_path && (
                <img
                    src={getFullImagePath(
                        result.profile_path || "",
                        imageGlobalProps.poster_sizes[0]
                    )}
                    alt={`poster of ${result.name}`}
                />
            )}
            {!result.profile_path && (
                <img src={fallbackUrl} alt="no image found" />
            )}
            <div className="searchResultVertical">
                {result.name.length > 15 && (
                    <h2>{result.name.substring(0, 10)}...</h2>
                )}
                {result.name.length <= 15 && <h2>{result.name}</h2>}
                <PersonSvg className="tvSvg" />
                <p>{result.gender === 2 ? "Male" : "Female"}</p>
            </div>
        </Link>
    );
};
