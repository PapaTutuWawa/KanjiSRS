import * as React from "react";

import { Link } from "react-router-dom";

import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import List, { ListItem, ListItemText } from "material-ui/List";
import Table, { TableHead, TableBody, TableRow, TableCell } from "material-ui/Table";
import Typography from "material-ui/Typography";
import { WithStyles, withStyles } from "material-ui/styles";
import Button from "material-ui/Button";

import { getRecentItems, getFailedItems } from "../models/User";

import { IResult } from "../models/Review";
import VocabTableRow from "../components/VocabTableRow";

const decorate = withStyles(() => ({
    paper: {
        padding: 15,
        margin: 20,
        'min-width': 300,
    },
    reviewButton: {
        'margin-bottom': 10,
        height: 60,
    },
    root: {
        flexGrow: 1,
        'flex-wrap': "wrap",
    }
}));

interface IDashboardProps {
    getLastReview: () => IResult[];
}

const ReviewLink = (props: any) => <Link to="/user/review" {...props} />;
type Style = WithStyles<"paper"> & WithStyles<"reviewButton"> & WithStyles<"root">;
const dClass = decorate(
    class Dashboard extends React.Component<Style & IDashboardProps, {}> {
        render() {
            // Destructure, so that we have a shortcut to this.props.classes
            const { classes } = this.props;

            // TODO: Clean this mess up!
            // Fetch the recent and failed items
            let id = 0;
            const recentItems = getRecentItems().map((kanji) => {
                return <ListItem button key={id++}>
                    <ListItemText primary={kanji.char} />
                </ListItem>;
            });
            const failedItems = getFailedItems().map((kanji) => {
                return <ListItem button key={id++}>
                    <ListItemText primary={kanji.char} />
                </ListItem>;
            });
            const lastReview = this.props.getLastReview().map((result: IResult) => {
                return <VocabTableRow key={id++} result={result} />;
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
                            <Typography variant="title">Last Review</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Vocabulary</TableCell>
                                        <TableCell>Task</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { lastReview }
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper elevation={4} className={classes.paper}>
                            <Typography variant="title">Recently Added Items</Typography>
                            <List component="nav">{recentItems}</List>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper elevation={4} className={classes.paper}>
                            <Typography variant="title">Recently Failed Items</Typography>
                            <List component="nav">{failedItems}</List>
                        </Paper>
                    </Grid>
                </Grid>
            </div>;
        }
    }
);

export default dClass;
