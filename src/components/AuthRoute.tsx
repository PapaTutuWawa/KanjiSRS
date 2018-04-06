import * as React from "react";

import { Route, Redirect } from "react-router-dom";

interface IAuthRoute {
    path: string;
    component: any;
    isAuth: () => boolean;
}

export default class AuthRoute extends React.Component<IAuthRoute, {}> {
    render() {
        const auth = this.props.isAuth();
        return <Route path={this.props.path} component={
            () => auth ? <this.props.component /> : <Redirect to="/login" />
        } />;
    }
};
