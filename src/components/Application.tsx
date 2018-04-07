import * as React from "react";

import { BrowserRouter, Route, Redirect } from "react-router-dom";
import AuthRoute from "./AuthRoute";

import CssBaseline from "material-ui/CssBaseline";

import Topbar from "./TopBar";
import BottomBar from "./BottomBar";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Review from "../pages/Review";
import PostReview from "../pages/PostReview";
import VocabList from "../pages/VocabList";

interface IApplicationState {
    // TODO: For debugging only!
    auth: boolean;
}

export default class Application extends React.Component<{}, IApplicationState> {
    constructor(props: any) {
        super(props);

        this.state = {
            auth: false,
        };

        this.checkAuth = this.checkAuth.bind(this);
        this.login = this.login.bind(this);
    }

    // NOTE: Because I fear that Promises need to be used, I already implement
    //       it like this!
    // Implementation
    // NOTE: If we succeed in logging in, we will resolve the Promise. If we fail, we
    //       reject the Promise.
    login(username: string, password: string): Promise<string> {
        return new Promise<string>((res, rej) => {
            // Just to see the timeout
            setTimeout(() => {
                if (username === "test" && password === "test") {
                    this.setState({
                        auth: true,
                    });

                    res("");
                } else {
                    rej("Wrong username or password");
                }
            }, 3000);
        });
    }

    checkAuth() {
        return this.state.auth === true;
    }

    render() {
        return <React.Fragment>
            <CssBaseline />
            <BrowserRouter>
                <div>
                    <Topbar isAuth={this.checkAuth} />
                    <Route exact={true} path="/" component={() => <Redirect to="/login" /> } />
                    <Route path="/login" component={() => <Login login={this.login} isAuth={this.checkAuth} /> } />
                    <AuthRoute path="/user/dashboard" component={Dashboard} isAuth={this.checkAuth} />
                    <AuthRoute path="/user/review" component={Review} isAuth={this.checkAuth} />
                    <AuthRoute path="/user/postReview" component={PostReview} isAuth={this.checkAuth} />
                    <AuthRoute path="/user/vocab" component={VocabList} isAuth={this.checkAuth} />
                    <BottomBar />
                </div>
            </BrowserRouter>
        </React.Fragment>;
    }
};
