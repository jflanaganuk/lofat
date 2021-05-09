import React from "react";

import "./menu.scss";
import { Link, useHistory } from "react-router-dom";
// @ts-ignore
import LeftArrow from "../images/left-arrow.svg";

export const Menu = () => {
    const history = useHistory();
    return (
        <>
            <div className="menuContainer">
                <LeftArrow
                    className="menuBack"
                    onClick={() => {
                        history.goBack();
                    }}
                />
                <Link to="/" className="menuItem">
                    Home
                </Link>
                <Link to="/search" className="menuItem">
                    Search
                </Link>
                <Link to="/lists" className="menuItem">
                    Lists
                </Link>
                <Link to="/settings" className="menuItem">
                    Settings
                </Link>
            </div>
        </>
    );
};
