// src/App.js

import React from "react";
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Map from "./components/Map/Map";
import ClientAccount from "./components/Users/ClientAccount";
import './App.css';
import Users from "./components/Users/Users";
import Providers from "./components/Users/Providers";

function App() {
    const { loading } = useAuth0();

    const padding = {
        padding: 10
    }

    if (loading) {
        return (
            <div>
                <header>
                    <NavBar />
                </header>
                <h2 style={padding}>Loading...</h2>
            </div>
        );
    }

    return (
        <div className="App">
            <BrowserRouter>
                <header>
                    <NavBar />
                </header>
                <Switch>
                    <Route path="/" exact />
                    <PrivateRoute path="/profile" component={Profile} />
                    <PrivateRoute path="/map" component={Map} />
                    <PrivateRoute path="/users" component={Users} />
                    {/* TODO: USERS ES TEMPORAL */}
                    <PrivateRoute path="/clientAccount" component={ClientAccount} />
                    <PrivateRoute path="/providers" component={Providers} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;