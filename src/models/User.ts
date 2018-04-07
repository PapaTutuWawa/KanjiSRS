import { IKanji, IResult, ResultType, QuestionType } from "../models/Review";

/*
  Retrieves the user's recently added kanji.
  TODO: Actually implement this
 */
export function getRecentItems(): IKanji[] {
    return [{
        char: "前",
        reading: "まえ",
        meaning: "Before"
    }, {
        char: "出",
        reading: "しゅつ",
        meaning: "Exit"
    }, {
        char: "大切",
        reading: "たいせつ",
        meaning: "important"
    }, {
        char: "大",
        reading: "たい",
        meaning: "big"
    }];
};

/*
  Retrieves the user's recently failed kanji.
  TODO: Actually implement this.
 */
export function getFailedItems(): IKanji[] {
    return [{
        char: "切る",
        reading: "kiru",
        meaning: "to cut"
    }, {
        char: "切れる",
        reading: "kireru",
        meaning: "to be cut"
    }];
};

export function getReviewVocab(): IKanji[] {
    return [{
        char: "切る",
        reading: "きる",
        meaning: "to cut"
    }, {
        char: "切れる",
        reading: "きれる",
        meaning: "to be cut"
    }];
}

export function fetchLastReview(): IResult[] {
    return [{
        type: ResultType.Correct,
        question: {
            type: QuestionType.Reading,
            kanji: {
                char: "切れる",
                reading: "きれる",
                meaning: "to be cut",
            },
            id: 0,
        }
    },{
        type: ResultType.Wrong,
        question: {
            type: QuestionType.Meaning,
            kanji: {
                char: "切れる",
                reading: "きれる",
                meaning: "to be cut",
            },
            id: 1,
        }
    }];
}

/*
  TODO: Actually retrieve the username from somewhere
 */
export function getUsername(): string {
    return "Polynomdivision";
};
