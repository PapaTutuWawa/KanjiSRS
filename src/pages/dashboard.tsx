import * as React from "react";

import { Link } from "react-router-dom";

import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import List, { ListItem, ListItemText } from "material-ui/List";
import Typography from "material-ui/Typography";
import { WithStyles, withStyles } from "material-ui/styles";
import Button from "material-ui/Button";

const decorate = withStyles(({ palette, spacing }) => ({
    root: {
        padding: spacing.unit,
        backgroundColor: palette.background,
        color: palette.primary,
    },
    paper: {
        padding: 15,
        margin: 20,
        height: 400
    }
}));

const MyLink = (props: any) => <Link to="/review" {...props} />;

const dClass = decorate(
    class Dashboard extends React.Component<WithStyles<"root"> & WithStyles<"paper">, {}> {
        render() {
            // Destructure, so that we have a shortcut to this.props.classes
            const { classes } = this.props;
            return <div>
                <Grid container spacing={24}>
                    <Grid item xs={4}>
                        <Paper elevation={4} className={classes.paper}>
                            <Button fullWidth={true} component={MyLink}>Review</Button>
                            <Typography variant="title">Last Review:</Typography>
                            // TODO: Put this in its own component
                            <List component="nav">
                                <ListItem button>
                                    <ListItemText primary="牛" />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={4} className={classes.paper}>
                            <Typography variant="title">Recently Added Items:</Typography>
                            // TODO: Put this in its own component
                            <List component="nav">
                                <ListItem button>
                                    <ListItemText primary="僕" />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={4} className={classes.paper}>
                            <Typography variant="title">Recently Failed Items:</Typography>
                            // TODO: Put this in its own component
                            <List component="nav">
                                <ListItem button>
                                    <ListItemText primary="出" />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </div>;
        }
    }
);

export default dClass;
