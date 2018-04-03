export interface IKanji {
    char: string;
    reading: string;
    meaning: string;
}

export enum QuestionType {
    Reading,
    Meaning,
}

export interface IQuestion {
    type: QuestionType,
    kanji: IKanji,
}
