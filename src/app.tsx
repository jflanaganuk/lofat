import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Container } from "./container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Offline } from "./offline";
import { rootUrl } from "./env";
import { TmdbPopularMovies } from "../types";

const App = () => {
    const [response, setResponse] = useState<TmdbPopularMovies | null>(null);

    useEffect(() => {
        var url = `${rootUrl}/movie/popular`;
        var req = new Request(url);
        fetch(req)
            .then((response) => response.json())
            .then((data: TmdbPopularMovies) => {
                if (!data.status_message) {
                    setResponse(data);
                } else {
                    console.error("Error with returned data:");
                    console.error(data);
                }
            })
            .catch((e) => console.error(e));
    }, []);

    return (
        <Router basename="/imdbfetch">
            <Switch>
                <Route exact path="/offline">
                    <Offline />
                </Route>
                <Route exact path="/">
                    <Container movies={response} />
                </Route>
                <Route exact path="/index.html">
                    <Container movies={response} />
                </Route>
                <Route path="/:id">
                    <Container movies={response} />
                </Route>
            </Switch>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
