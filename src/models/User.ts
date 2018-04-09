import { IVocab, ISRSData, IResult, ResultType, QuestionType } from "../models/Review";

// Example SRS Data. TODO: Remove
const data: ISRSData = {
    easiness: 1.3,
    correctAnswers: 0,
    nextDueDate: new Date(),
};

/*
  Retrieves the user's recently added kanji.
  TODO: Actually implement this
 */
export function getRecentItems(): IVocab[] {
    return [
    {
        japanese: "前",
        reading: "まえ",
        meaning: "Before",
        srsData: data,
    }, {
        japanese: "出",
        reading: "しゅつ",
        meaning: "Exit",
        srsData: data,
    }, {
        japanese: "大切",
        reading: "たいせつ",
        meaning: "important",
        srsData: data,
    }, {
        japanese: "大",
        reading: "たい",
        meaning: "big",
        srsData: data,
    }];
};

/*
  Retrieves the user's recently failed kanji.
  TODO: Actually implement this.
 */
export function getFailedItems(): IVocab[] {
    return [{
        japanese: "切る",
        reading: "kiru",
        meaning: "to cut",
        srsData: data,
    }, {
        japanese: "切れる",
        reading: "kireru",
        meaning: "to be cut",
        srsData: data,
    }];
};

export function getReviewVocab(): IVocab[] {
    return [{
        japanese: "切る",
        reading: "きる",
        meaning: "to cut",
        srsData: data,
    }, {
        japanese: "切れる",
        reading: "きれる",
        meaning: "to be cut",
        srsData: data,
    }];
}

export function fetchLastReview(): IResult[] {
    return [{
        type: ResultType.Correct,
        question: {
            type: QuestionType.Reading,
            vocab: {
                japanese: "切れる",
                reading: "きれる",
                meaning: "to be cut",
                srsData: data,
            },
            id: 0,
        }
    },{
        type: ResultType.Wrong,
        question: {
            type: QuestionType.Meaning,
            vocab: {
                japanese: "切れる",
                reading: "きれる",
                meaning: "to be cut",
                srsData: data,
            },
            id: 1,
        }
    }];
}

let serverVocab: IVocab[] = [{
        japanese: "前",
        reading: "まえ",
        meaning: "Before",
        srsData: data,
    }, {
        japanese: "出",
        reading: "しゅつ",
        meaning: "Exit",
        srsData: data,
    }, {
        japanese: "大切",
        reading: "たいせつ",
        meaning: "important",
        srsData: data,
    }, {
        japanese: "大",
        reading: "たい",
        meaning: "big",
        srsData: data,
    }
];

/*
  TODO: Actually implement this
 */
export function postVocabulary(vocab: IVocab): boolean {
    serverVocab = serverVocab.concat(vocab);
    return true;
}

/*
  TODO: Actually implement this
 */
export function fetchVocabulary(): IVocab[] {
    return serverVocab;
}

/*
  TODO: Actually retrieve the username from somewhere
 */
export function getUsername(): string {
    return "Polynomdivision";
};
