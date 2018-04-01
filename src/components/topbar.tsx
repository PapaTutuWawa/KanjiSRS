import * as React from "react";

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import Icon from "material-ui/Icon";

export default class Topbar extends React.Component<{}, {}> {
    render() {
        return <div>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="title" color="inherit">Test</Typography>
                    <div>
                        <IconButton aria-label="Dashboard">
                            <Icon>Home</Icon>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>;
    }
}
