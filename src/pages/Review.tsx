import * as React from "react";

import { Redirect } from "react-router-dom";

import Grid from "material-ui/Grid";
import { WithStyles, withStyles } from "material-ui/styles";

import { KanjiView } from "../components/KanjiView";

import { IQuestion, QuestionType, IResult, ResultType } from "../models/Review";
import { generateQuestionQueue, shuffleQuestionQueue } from "../models/ReviewQueue";

import { getReviewVocab } from "../backend/User";

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

const dClass = decorate(
    class Review extends React.Component<WithStyles<"review">, IReviewState> {
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
            const id = this.questions[this.state.questionIndex].id;

            // Check if we already marked that answer
            for(let i = 0; i < this.questions.length; i++) {
                if (this.questions[this.state.questionIndex].id == id) return;
            }

            // Mark the answer
            this.setState({
                review: this.state.review.concat([{
                    type: type,
                    id: id
                }])
            });
        }

        validateAnswer(answer: string): boolean {
            const question = this.questions[this.state.questionIndex];

            // Advance the review by showing the next question
            const continueReview = () => {
                // We check here if we would go beyond the bounds of the array.
                // If we would, we call the review done and set the state
                // appropriately. If not, then we just show the next question.
                const newIndex = this.state.questionIndex + 1;
                if (newIndex >= this.questions.length) {
                    this.setState({
                        done: true,
                    });
                } else {
                    this.setState({
                        questionIndex: this.state.questionIndex + 1,
                    });
                }
            };

            // Shorthand functions for marking the questions
            const markSucc = () => this.markVocab(ResultType.Correct);
            const markWrong = () => this.markVocab(ResultType.Wrong);

            switch(question.type) {
                case QuestionType.Reading:
                    if (answer === question.kanji.reading) {
                        continueReview();
                        markSucc();
                        return true;
                    } else {
                        markWrong();
                        return false;
                    }
                case QuestionType.Meaning:
                    if (answer.toLowerCase() === question.kanji.meaning.toLowerCase()) {
                        continueReview();
                        markSucc();
                        return true;
                    } else {
                        markWrong();
                        return false;
                    }
            }
        }

        render() {
            const { classes } = this.props;
            const question = this.questions[this.state.questionIndex];
            return <div>
                { this.state.done ? <Redirect to="/postReview" /> : null }
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
