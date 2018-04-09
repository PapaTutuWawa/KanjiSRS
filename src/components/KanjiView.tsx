import * as React from "react";

import Card, { CardContent, CardActions } from "material-ui/Card";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import { WithStyles, withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Popover from "material-ui/Popover";

import KanjiInput from "./KanjiInput";

import { IQuestion, QuestionType } from "../models/ReviewQueue";
import { ResultType, ResultTypeColor } from "../models/Review";

interface IKanjiViewState {
    popupMessage: string;
    popupOpen: boolean;

    result: ResultType;
}

interface IKanjiViewProps {
    question: IQuestion;
    validate: (answer: string) => ResultType;
}

const decorate = withStyles(() => ({
    card: {
        'margin-top': 10,
        padding: 10,
    },
    popupText: {
        margin: 20,
    },
    forgotButton: {
        marginLeft: 20,
    }
}));

// TODO: We cause a setState after dismount somewhere!
type Style = WithStyles<"card"> & WithStyles<"popupText"> & WithStyles<"forgotButton">;
const dClass = decorate(
    class KanjiView extends React.Component<Style & IKanjiViewProps, IKanjiViewState> {
        // Needed for the Popover to be positioned next to the Kanji
        private kanjiRef: any = null;
        private popupTimeout: any = null;

        constructor(props: any) {
            super(props);

            this.state = {
                popupMessage: "Correct",
                popupOpen: false,
                result: ResultType.Correct // Let's stay positive
            };

            this.checkAnswer = this.checkAnswer.bind(this);
            this.resetPopup = this.resetPopup.bind(this);
            this.showPopup = this.showPopup.bind(this);
            this.handleForgotten = this.handleForgotten.bind(this);
        }

        resetPopup() {
            if (!this.state.popupOpen) return;

            this.setState({
                popupOpen: false
            });
        }
        showPopup(msg: string) {

            this.setState({
                popupMessage: msg,
                popupOpen: true
            });

            this.popupTimeout = setTimeout(this.resetPopup, 1000);
        }

        componentWillDismount() {
            clearTimeout(this.popupTimeout);
        }

        /*
           Here we just pass an empty string to the evaluation function, so that
           we can mark the answer as a "I don't know"-answer.
         */
        handleForgotten(evt: any) {
            this.props.validate("");

            // Set the state to forgotten, so we get the right colour
            this.setState({
                result: ResultType.Forgotten,
            });

            this.showPopup("Forgotten");
        }

        checkAnswer(input: string) {
            // Check if the user even wrote something
            if ((this.refs.input as KanjiInput).getInput() === "") {
                this.setState({
                    // TODO: This seems rather hacky
                    // To make the popup appear red, just say that the answer is wrong
                    // (which it technically is)
                    result: ResultType.Wrong,
                });
                this.showPopup("Answer cannot be empty");
                return;
            }

            // Clear the input in any case
            (this.refs.input as KanjiInput).clear();

            /*
               Prevent writing the same thing over and over by having
               to functions, which set the correct-state and show
               the popup
             */
            const correct = () => {
                // Set the state to correct, so we get the right colour
                this.setState({
                    result: ResultType.Correct,
                });

                this.showPopup("Correct")
            };
            const wrong = () => {
                // Set the state to wrong, so we get the right colour
                this.setState({
                    result: ResultType.Wrong,
                });

                this.showPopup("Wrong")
            };

            switch (this.props.validate(input)) {
                case ResultType.Correct:
                    correct();
                    break;
                case ResultType.Wrong:
                    wrong();
                    break;
                case ResultType.Forgotten:
                    // In theory, this should never occur
                    // TODO:
                    break;
            }
        }

        render(): any {
            const { question, classes } = this.props;
            return <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container justify="center">
                            <Typography
                                variant="display4"
                                color="inherit"
                            ><span
                                 ref={(node) => this.kanjiRef = node }
                             >{question.vocab.japanese}</span></Typography>
                        </Grid>
                        <Popover
                            open={this.state.popupOpen}
                            anchorEl={this.kanjiRef}
                            anchorReference="anchorEl"
                            anchorPosition={{ top: 0, left: 0 }}
                            onClose={() => {} }
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
                                    // If the answer given was correct, then the paper should appear green. But
                                    // if the answer was wrong, then the paper should be red.
                                    backgroundColor: ResultTypeColor(this.state.result),
                                    color: "white",
                                }
                            }}>
                            <Typography
                                className={classes.popupText}
                                variant="title"
                                color="inherit">{this.state.popupMessage}</Typography>
                        </Popover>
                    </CardContent>
                    <CardActions>
                        <Grid container justify="center">
                            <KanjiInput
                                ref="input"
                                type={question.type}
                                validate={this.checkAnswer}
                            />
                            <Button
                                variant="raised"
                                color="secondary"
                                onClick={this.handleForgotten}
                                className={classes.forgotButton}>
                                Forgotten
                            </Button>
                        </Grid>
                    </CardActions>
                </Card>
            </div>;
        }
    });

export { dClass as KanjiView, QuestionType };
