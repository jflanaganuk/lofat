import React from "react";
import ReactDOM from "react-dom";
import { MovieListContainer } from "./movieListContainer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Search } from "./search";
import { Menu } from "./menu";
import { Home } from "./home";
import { Attribution } from "./attribution";
import { GithubLink } from "./githubLink";
import { NotFound } from "./404";
import { TVListContainer } from "./tvListContainer";
import { Lists } from "./lists";
import { Settings } from "./settings";
import { ActorPopularListContainer } from "./actorPopularListContainer";

const App = () => {
    return (
        <Router basename="/lofat">
            <Menu />
            <Switch>
                <Route exact path="/search">
                    <div className="searchHomeContainer">
                        <Search />
                    </div>
                </Route>
                <Route exact path="/movie">
                    <MovieListContainer />
                </Route>
                <Route exact path="/tv">
                    <TVListContainer />
                </Route>
                <Route exact path="/actor">
                    <ActorPopularListContainer />
                </Route>
                <Route path="/movie/:id">
                    <MovieListContainer />
                </Route>
                <Route path="/tv/:id">
                    <TVListContainer />
                </Route>
                <Route path="/actor/:id">
                    <ActorPopularListContainer />
                </Route>
                <Route exact path="/lists">
                    <Lists />
                </Route>
                <Route exact path="/settings">
                    <Settings />
                </Route>
                <Route exact path="/index.html">
                    <Home />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <NotFound />
            </Switch>
            <Attribution />
            <GithubLink />
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
