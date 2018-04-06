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
import KanjiList from "../pages/KanjiList";

interface IApplicationState {
    // TODO: For debugging only!
    auth: boolean;
}

export default class Application extends React.Component<{}, IApplicationState> {
    constructor(props: any) {
        super(props);

        this.state = {
            // TODO: Definetely change!
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
    async login(username: string, password: string): Promise<string> {
        return new Promise<string>((res, rej) => {
            // Just to see the timeout
            setTimeout(() => {
                this.setState({
                    auth: true,
                });

                res();
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
                    <Topbar />
                    <Route exact={true} path="/" component={() => <Redirect to="/login" /> } />
                    <Route path="/login" component={() => <Login login={this.login} auth={this.checkAuth} /> } />
                    <AuthRoute path="/dashboard" component={Dashboard} isAuth={this.checkAuth} />
                    <AuthRoute path="/review" component={Review} isAuth={this.checkAuth} />
                    <AuthRoute path="/postReview" component={PostReview} isAuth={this.checkAuth} />
                    <AuthRoute path="/kanjilist" component={KanjiList} isAuth={this.checkAuth} />
                </div>
            </BrowserRouter>
            <BottomBar />
        </React.Fragment>;
    }
};
