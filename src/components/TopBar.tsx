import * as React from "react";

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { Link } from "react-router-dom";

export default class Topbar extends React.Component<{}, {}> {
    render() {
        return <div>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography
                        variant="title"
                        color="inherit">
                        <Link to="/">Kanji SRS</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>;
    }
}
