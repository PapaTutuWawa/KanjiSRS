import { IVocab, IResult, ResultType, QuestionType } from "../models/Review";

/*
  Retrieves the user's recently added kanji.
  TODO: Actually implement this
 */
export function getRecentItems(): IVocab[] {
    return [{
        japanese: "前",
        reading: "まえ",
        meaning: "Before"
    }, {
        japanese: "出",
        reading: "しゅつ",
        meaning: "Exit"
    }, {
        japanese: "大切",
        reading: "たいせつ",
        meaning: "important"
    }, {
        japanese: "大",
        reading: "たい",
        meaning: "big"
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
        meaning: "to cut"
    }, {
        japanese: "切れる",
        reading: "kireru",
        meaning: "to be cut"
    }];
};

export function getReviewVocab(): IVocab[] {
    return [{
        japanese: "切る",
        reading: "きる",
        meaning: "to cut"
    }, {
        japanese: "切れる",
        reading: "きれる",
        meaning: "to be cut"
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
            },
            id: 1,
        }
    }];
}

let serverVocab: IVocab[] = [
    {
        japanese: "前",
        reading: "まえ",
        meaning: "Before"
    }, {
        japanese: "出",
        reading: "しゅつ",
        meaning: "Exit"
    }, {
        japanese: "大切",
        reading: "たいせつ",
        meaning: "important"
    }, {
        japanese: "大",
        reading: "たい",
        meaning: "big"
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
