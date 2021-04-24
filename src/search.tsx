import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TmdbMovieSearchResult, TmdbMovieSearchResults } from "../types";
import { imageGlobalProps, rootUrl } from "./env";
import { formatDate, getFullImagePath } from "./movie";

import { fallbackUrl } from './actor';

import "./search.scss";

enum Status {
    Idle = "Idle",
    Pending = "Pending",
    Success = "Success",
    Error = "Error",
}

export const Search = () => {
    const [status, setStatus] = useState(Status.Idle);
    const [results, setResults] = useState<TmdbMovieSearchResults | null>(null);

    const val = document.location.search.split("=")[1];
    useEffect(() => {
        if (val) {
            setStatus(Status.Pending);
            const url = `${rootUrl}/search/movie?query=${val}`;
            const req = new Request(url);
            fetch(req)
                .then((response) => response.json())
                .then((data: TmdbMovieSearchResults) => {
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
        document.location.search = `query=${val}`;
    };

    return (
        <form className="searchContainer" onSubmit={submitForm}>
            <div className="searchSticky">
                <h2>Search</h2>
                <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    onBlur={submitInput}
                    defaultValue={sanitiseVal(val)}
                />
            </div>
            {status === Status.Pending && <p>Loading...</p>}
            {results && (
                <div className="searchResultContainer">
                    {results.results.map((result) => {
                        return <SearchResult result={result} />;
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
        <Link key={result.id} className="searchResult" to={`/movie/${result.id}`}>
            {result.poster_path && <img src={getFullImagePath(result.poster_path || "", imageGlobalProps.poster_sizes[0])} alt={`poster of ${result.title}`}/>}
            {!result.poster_path && <img src={fallbackUrl} alt="no image found"/>}
            <div className="searchResultVertical">
                {result.title.length > 15 && <h2>{result.title.substring(0, 15)}...</h2>}
                {result.title.length <= 15 && <h2>{result.title}</h2>}
                <small>{formatDate(result.release_date)}</small>
                {result.overview.length > 60 && <p>{result.overview.substring(0, 60)}...</p>}
                {result.overview.length <= 60 && <p>{result.overview}</p>}
            </div>
        </Link>
    );
};
