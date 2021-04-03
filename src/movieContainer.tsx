import React, { useEffect, useState } from 'react';
import { BoxOfficeItem, Title } from '../types';
import { Movie } from './movie';

export const MovieContainer = (props: BoxOfficeItem) => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        var url = `https://www.uploadr.co.uk/imdbfetch/public/outputs/${props.id}.json`;
        var req = new Request(url);
        fetch(req)
        .then((response) => response.json())
        .then((data) => {
            if (data.errorMessage == "") {
                setResponse(data);
            } else {
                console.error("Error with returned data:");
                console.error(data);
            }
        })
        .catch((e) => console.error(e));
    }, [props.id])
        
    return <Movie
        movie={response}
        {...props}
    />
}