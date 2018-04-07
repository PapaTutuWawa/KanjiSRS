import * as React from "react";

import { Link } from "react-router-dom";

import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import List, { ListItem, ListItemText } from "material-ui/List";
import Typography from "material-ui/Typography";
import { WithStyles, withStyles } from "material-ui/styles";
import Button from "material-ui/Button";

import { getRecentItems, getFailedItems } from "../backend/User";

const decorate = withStyles(() => ({
    paper: {
        padding: 15,
        margin: 20,
        'min-width': 300,
    },
    reviewButton: {
        'margin-bottom': 10,
    },
    root: {
        flexGrow: 1,
        'flex-wrap': "wrap",
    }
}));

const ReviewLink = (props: any) => <Link to="/user/review" {...props} />;
type StyleAttributes = WithStyles<"paper"> & WithStyles<"reviewButton"> & WithStyles<"root">;
const dClass = decorate(
    class Dashboard extends React.Component<StyleAttributes, {}> {
        render() {
            // Destructure, so that we have a shortcut to this.props.classes
            const { classes } = this.props;

            // Fetch the recent and failed items
            const recentItems = getRecentItems().map((kanji) => {
                return <ListItem button key={kanji.char}>
                    <ListItemText primary={kanji.char} />
                </ListItem>;
            });
            const failedItems = getFailedItems().map((kanji) => {
                return <ListItem button key={kanji.char}>
                    <ListItemText primary={kanji.char} />
                </ListItem>;
            });

            return <div>
                <Grid container className={classes.root}>
                    <Grid item xs>
                        <Paper elevation={4} className={classes.paper}>
                            <Button
                                className={classes.reviewButton}
                                fullWidth={true}
                                component={ReviewLink}
                                variant="raised"
                                color="primary"
                            >Review</Button>
                            <Typography variant="title">Last Review:</Typography>
                            // TODO: Put this in its own component
                            <List component="nav">
                                <ListItem button>
                                    <ListItemText primary="牛" />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper elevation={4} className={classes.paper}>
                            <Typography variant="title">Recently Added Items:</Typography>
                            // TODO: Put this in its own component
                            <List component="nav">{recentItems}</List>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper elevation={4} className={classes.paper}>
                            <Typography variant="title">Recently Failed Items:</Typography>
                            // TODO: Put this in its own component
                            <List component="nav">{failedItems}</List>
                        </Paper>
                    </Grid>
                </Grid>
            </div>;
        }
    }
);

export default dClass;
