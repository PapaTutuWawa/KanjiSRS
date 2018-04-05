import * as React from "react";

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/Typography";
import SwipeableDrawer from "material-ui/SwipeableDrawer";
import List, { ListItem, ListItemText } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";

import MenuIcon from "material-ui-icons/Menu";
import AccountCircle from "material-ui-icons/AccountCircle";

import { Link } from "react-router-dom";

interface ITopbarState {
    drawerOpen: boolean;
}

const DashboardLink = (props: any) => <Link to="/dashboard" {...props} />;

export default class Topbar extends React.Component<{}, ITopbarState> {
    constructor(props: any) {
        super(props);

        this.state = {
            drawerOpen: false,
        };

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }


    openDrawer() {
        this.setState({
            drawerOpen: true,
        });
    }
    closeDrawer() {
        this.setState({
            drawerOpen: false,
        });
    }

    render() {
        // TODO: Move the Drawer into its own component
        return <div>
            <AppBar position="static" color="default">
                <Toolbar>
                    <IconButton
                        aria-label="Menu"
                        onClick={() => this.openDrawer() }
                        style={{
                            marginRight: 20,
                            cursor: "pointer",
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="title"
                        color="inherit"
                        className="MenuText"
                    >
                        Kanji SRS
                    </Typography>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                anchor="left"
                open={this.state.drawerOpen}
                onOpen={this.openDrawer}
                onClose={this.closeDrawer}
            >
                <div
                    tabIndex={0}
                    onClick={this.closeDrawer}
                    onKeyDown={this.closeDrawer}
                    role="button"
                >
                    <List className="DrawerList">
                        <ListItem button>
                            <Avatar>
                                <AccountCircle />
                            </Avatar>
                            <ListItemText primary="Account" />
                        </ListItem>
                        <ListItem button component={DashboardLink}>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Your Kanji" />
                        </ListItem>
                    </List>
                </div>
            </SwipeableDrawer>
        </div>;
    }
}
