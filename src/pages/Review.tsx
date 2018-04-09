import * as React from "react";

import { Redirect } from "react-router-dom";

import Grid from "material-ui/Grid";
import { WithStyles, withStyles } from "material-ui/styles";

import { KanjiView } from "../components/KanjiView";

import { IQuestion, QuestionType, IResult, ResultType } from "../models/Review";
import { generateQuestionQueue, shuffleQuestionQueue } from "../models/ReviewQueue";

// TODO: Move this into the Application Component
import { getReviewVocab } from "../models/User";

const decorate = withStyles(({ palette, spacing }) => ({
    review: {
        margin: 15,
    }
}));

interface IReviewState {
    review: IResult[];
    questionIndex: number;
    done: boolean;
}

interface IReviewProps {
    setLastReview: (results: IResult[]) => void;
}

const dClass = decorate(
    class Review extends React.Component<WithStyles<"review"> & IReviewProps, IReviewState> {
        private questions: IQuestion[] = [];

        constructor(props: any) {
            super(props);

            this.state = {
                review: [],
                questionIndex: 0,
                done: false,
            }

            this.questions = shuffleQuestionQueue(generateQuestionQueue(getReviewVocab()));

            this.validateAnswer = this.validateAnswer.bind(this);
            this.markVocab = this.markVocab.bind(this);
        }

        markVocab(type: ResultType) {
            // Get the question's ID
            const question = this.questions[this.state.questionIndex];
            const id = question.id;

            // If we have already marked the question, it was answered wrong. If, this time, the
            // answer is correct, we do not want to override the wrong mark.
            // TODO: If we answer wrong multiple times, then it also appears multiple times
            // TODO: Handle forgotten items
            if (this.state.review.find((el: IResult) => {
                return el.question.id === id;
            }) && (type === ResultType.Correct)) return;

            // Mark the answer
            this.setState({
                review: this.state.review.concat([{
                    type: type,
                    question: question,
                }])
            });
        }

        /*
           See if the answer was correct. Return true, if that's the
           case. False, otherwise.
         */
        validateAnswer(answer: string): ResultType {
            const question = this.questions[this.state.questionIndex];

            // Advance the review by showing the next question
            const continueReview = () => {
                // We check here if we would go beyond the bounds of the array.
                // If we would, we call the review done and set the state
                // appropriately. If not, then we just show the next question.
                const newIndex = this.state.questionIndex + 1;
                if (newIndex >= this.questions.length) {
                    // Update the last review first...
                    // ... and then go to the post review page
                    this.setState({
                        done: true,
                    }, () => {
                        this.props.setLastReview(this.state.review);
                    });
                } else {
                    this.setState({
                        questionIndex: newIndex,
                    });
                }
            };

            // Shorthand functions for marking the questions
            const markSucc = () => this.markVocab(ResultType.Correct);
            const markWrong = () => this.markVocab(ResultType.Wrong);
            const markForgotten = () => this.markVocab(ResultType.Forgotten);

            // TODO: Maybe find a better way
            // If the answer is not known (e.g. forgotte), then just mark it as wrong,
            // but proceed.
            if (answer === "") {
                continueReview();
                markForgotten();
                return ResultType.Forgotten;
            }

            switch(question.type) {
                case QuestionType.Reading:
                    if (answer === question.vocab.reading) {
                        continueReview();
                        markSucc();
                        return ResultType.Correct;
                    } else {
                        markWrong();
                        return ResultType.Wrong;
                    }
                case QuestionType.Meaning:
                    // TODO: Maybe check if we're still close
                    if (answer.toLowerCase() === question.vocab.meaning.toLowerCase()) {
                        continueReview();
                        markSucc();
                        return ResultType.Correct;
                    } else {
                        markWrong();
                        return ResultType.Wrong;
                    }
            }
        }

        render() {
            const { classes } = this.props;
            const question = this.questions[this.state.questionIndex];
            return <div>
                { this.state.done ? <Redirect to="/user/postReview" /> : null }
                <Grid container justify="center">
                    <Grid item xs={12} lg={3} className={classes.review}>
                        <KanjiView question={question} validate={this.validateAnswer} />
                    </Grid>
                </Grid>
            </div>;
        }
    }
);

export default dClass;
