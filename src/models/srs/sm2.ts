import { ISRSData, ResultType } from "../Review";

const CORRECT = 3;
const WRONG = 2;
const FORGOTTEN = 0;

export const DEFAULT_EASINESS = 2.5;

const MILLI_PER_DAY = 1000 * 60* 60 * 24;

/*
  Returns the current time in milliseconds since 1970
 */
function today(): number {
    return new Date().getTime();
}

/*
  Returns the length of @num days in milliseconds
 */
function daysToMilli(num: number): number {
    return num * MILLI_PER_DAY;
}

/*
  Returns the next due-date of an item, according to the SM2 Algorithm
 */
export function nextDueDate(metadata: ISRSData, correct: boolean): Date {
    let days: number;
    if (correct) {
        days = daysToMilli(6 * Math.pow(metadata.easiness, metadata.correctAnswers - 1));
    } else {
        days = daysToMilli(1);
    }

    return new Date(today() + days);
}

/*
  Converts the result of a question into its performance score
 */
export function performanceRating(resultType: ResultType): number {
    switch (resultType) {
        case ResultType.Correct:
            return CORRECT;
        case ResultType.Wrong:
            return WRONG;
        case ResultType.Forgotten:
            return FORGOTTEN;
    }
};

/*
  Calculates the change in easiness using the items meatadata and its
  performance rating
 */
export function easinessDelta(metadata: ISRSData, perfRating: number): number {
    return -0.8 + 0.28 * perfRating + 0.02 * Math.pow(perfRating, 2);
}
