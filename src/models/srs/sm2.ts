import { IVocab, ISRSData, ResultType } from "../Review";

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
export function nextDueDate(metadata: ISRSData, rtype: ResultType): Date {
    let days: number;
    if (rtype === ResultType.Correct) {
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
  Calculates the change in easiness using the items performance rating
 */
export function easinessDelta(perfRating: number): number {
    return -0.8 + 0.28 * perfRating + 0.02 * Math.pow(perfRating, 2);
}

export function updateVocab(vocab: IVocab, rtype: ResultType): IVocab {
    return Object.assign(vocab, {
        srsData: {
            easiness: vocab.srsData.easiness + easinessDelta(performanceRating(rtype)),
            nextDueDate: nextDueDate(vocab.srsData, rtype),
            // Increment the number of correct answers, if the answer was correct. Otherwise, we just
            // set it to 0.
            correctAnswers: (rtype === ResultType.Correct) ? vocab.srsData.correctAnswers + 1 : 0,
        }
    });
}
