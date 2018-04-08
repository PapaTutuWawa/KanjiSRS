import * as React from "react";

import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { WithStyles, withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Table, { TableBody,
                TableCell,
                TableHead,
                TableRow,
                TableFooter,
                TablePagination } from "material-ui/Table";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import Dialog, { DialogActions, DialogContent, DialogTitle } from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import Snackbar from "material-ui/Snackbar";
import Popover from "material-ui/Popover";

//import DeleteIcon from "material-ui-icons/Delete";
import AddIcon from "material-ui-icons/Add";
import CloseIcon from "material-ui-icons/Close";
import PencilIcon from "../components/icons/PencilIcon";

// TODO: Move this into the Application Component
import { fetchVocabulary } from "../models/User";
import { IVocab } from "../models/Review";

// We cannot set overflow. But the Docs say it's okay,
// so ignore all the compiler errors
//@ts-ignore
const decorate = withStyles(() => ({
    paper: {
        padding: 15,
        margin: 20,
        'min-width': 300,
    },
    tableWrapper: {
        overflowX: "auto",
    },
    table: {
        // TODO: On mobile it stil looks weird
        'min-width': 500,
    },
    addFab: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    dialogPopupText: {
        margin: 20,
    }
}));

interface IVocabListState {
    showDialog: boolean;
    dialogPopupOpen: boolean;
    dialogPopupMessage: string;

    snackOpen: boolean;
    snackMessage: string;

    rowsPerPage: number;
    page: number;

    vocab: IVocab[];
}

interface IVocabListProps {
    addVocabulary: (vocab: IVocab) => boolean;
}

// TODO: Make the Pagination work
// TODO: Implement the edit functionality
type Style = WithStyles<"paper"> &
             WithStyles<"table"> &
             WithStyles<"addFab"> &
             WithStyles<"dialogPopupText"> &
             WithStyles<"tableWrapper">;
const dClass = decorate(
    class VocabList extends React.Component<Style& IVocabListProps, IVocabListState> {
        private japaneseRef: any = null;
        private readingRef: any = null;
        private meaningRef: any = null;
        private addButtonRef: any = null;

        constructor(props: any) {
            super(props);

            this.state = {
                showDialog: false,
                dialogPopupOpen: false,
                dialogPopupMessage: "",

                snackOpen: false,
                snackMessage: "",

                rowsPerPage: 5,
                page: 0,

                vocab: [],
            };

            this.showDialog = this.showDialog.bind(this);
            this.hideDialog = this.hideDialog.bind(this);
            this.addVocabulary = this.addVocabulary.bind(this);
            this.verifyVocabInput = this.verifyVocabInput.bind(this);
            this.handleChangePage = this.handleChangePage.bind(this);
            this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        }

        componentDidMount() {
            this.setState({
                vocab: fetchVocabulary(),
            });
        }

        showDialog() {
            this.setState({
                showDialog: true,
            });
        }
        hideDialog() {
            this.setState({
                showDialog: false,
            });
        }

        /*
           Checks if all fields are correctly filled in. If there are no problems, then
           true will be returned. False, otherwise.
         */
        verifyVocabInput(): boolean {
            if (this.japaneseRef.value === ""
                || this.readingRef.value === ""
                || this.meaningRef.value === "") {
                return false;
            }

            return true;
        }

        addVocabulary() {
            // First check if we could even add this vocab (e.g. no empty fields)
            if (!this.verifyVocabInput()) {
                this.setState({
                    dialogPopupOpen: true,
                    dialogPopupMessage: "A required field is not specified",
                });

                return;
            }

            this.hideDialog();
            const vocab = {
                japanese: this.japaneseRef.value,
                reading: this.readingRef.value,
                meaning: this.meaningRef.value,
            };
            const ret = this.props.addVocabulary(vocab);

            if (ret) {
                this.setState({
                    snackOpen: true,
                    snackMessage: "Vocabulary added",
                    vocab: this.state.vocab.concat(vocab),
                });
            } else {
                this.setState({
                    snackOpen: true,
                    snackMessage: "An error occured while adding the vocabulary",
                });
            }

        }

        handleChangePage(evt: any, page: number) {
            this.setState({
                page: page,
            });
        }
        handleChangeRowsPerPage(evt: any) {
            this.setState({
                rowsPerPage: evt.target.value,
            });
        }

        render() {
            const { classes } = this.props;

            let id = 0;
            const vocabRows = this.state.vocab.map((vocab) => {
                return <TableRow key={id++}>
                    <TableCell>
                        <Typography variant="display2" color="inherit">
                            { vocab.japanese }
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="body1" color="inherit">
                            { vocab.reading }
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="body1" color="inherit">
                            { vocab.meaning }
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <IconButton color="inherit">
                            <PencilIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>;
            });

            return <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={this.state.snackOpen}
                    autoHideDuration={3000}
                    onClose={(evt) => this.setState({snackOpen: false})}
                    SnackbarContentProps={{
                        'aria-describedby': "message-id",
                    }}
                    message={<span id="message-id">{this.state.snackMessage}</span> }
                    action={[
                        <IconButton
                            key={"snackBarCloseButton"}
                            onClick={(evt) => this.setState({snackOpen: false})}
                                color="inherit">
                            <CloseIcon />
                        </IconButton>
                    ]}
                ></Snackbar>
                <Dialog
                    disableBackdropClick
                    open={this.state.showDialog}
                    onClose={this.hideDialog}>
                    <DialogTitle>Add Vocabulary</DialogTitle>
                    <DialogContent>
                        <Grid container direction="column">
                            <TextField
                                inputRef={(node) => this.japaneseRef = node }
                                label="Japanese"/>
                            <TextField
                                inputRef={(node) => this.readingRef = node }
                                label="Reading"/>
                            <TextField
                                inputRef={(node) => this.meaningRef = node }
                                label="Meaning"/>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(evt) => this.hideDialog() } color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={(evt) => this.addVocabulary()}
                            color="secondary"
                            buttonRef={(node) => this.addButtonRef = node}>
                            Add
                        </Button>
                        <Popover
                            open={this.state.dialogPopupOpen}
                            anchorEl={this.addButtonRef}
                            anchorReference="anchorEl"
                            anchorPosition={{ top: 0, left: 0 }}
                            onClose={() => this.setState({ dialogPopupOpen: false}) }
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            PaperProps={{
                                style: {
                                    backgroundColor: "#f03434",
                                    color: "white",
                                }
                            }}>
                            <Typography
                                className={classes.dialogPopupText}
                                variant="title"
                                color="inherit">{this.state.dialogPopupMessage}</Typography>
                        </Popover>
                    </DialogActions>
                </Dialog>
                <Button
                    variant="fab"
                    color="primary"
                    onClick={(evt) => this.showDialog() }
                    className={classes.addFab}>
                    <AddIcon />
                </Button>
                <Grid container justify="center">
                    <Grid item xs={12} lg={5}>
                        <Paper className={classes.paper}>
                            <Grid container direction="column">
                                <Typography variant="title" color="inherit">
                                    Your Vocabulary
                                </Typography>
                                <div className={classes.tableWrapper}>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Vocabulary</TableCell>
                                                <TableCell>Reading</TableCell>
                                                <TableCell>Meaning</TableCell>
                                                <TableCell>Edit</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            { vocabRows }
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    component="div"
                                                    count={5}
                                                    rowsPerPage={this.state.rowsPerPage}
                                                    page={this.state.page}
                                                    backIconButtonProps={{
                                                        'aria-label': 'Previous Page',
                                                    }}
                                                    nextIconButtonProps={{
                                                        'aria-label': 'Next Page',
                                                    }}
                                                    onChangePage={this.handleChangePage}
                                                    onChangeRowsPerPage={this.handleChangeRowsPerPage} />
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </div>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>;
        }
    }
);

export default dClass;
