import { IKanji, QuestionType, IQuestion } from "./Review";

function intRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) +  min);
}

/*
  Convert a list of Kanji into a list of questions, consisting of
  reading and meaning.
*/
export function generateQuestionQueue(kanjis: IKanji[]): IQuestion[] {
    let ret: IQuestion[] = [];
    let i = 0;
    kanjis.forEach((kanji) => {
        ret.push({
            type: QuestionType.Reading,
            kanji: kanji,
            id: i++,
        });
        ret.push({
            type: QuestionType.Meaning,
            kanji: kanji,
            id: i++,
        });
    });

    return ret;
};

/*
  Shuffles the Review Queue using a Fisher–Yates shuffle.
  (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
*/
export function shuffleQuestionQueue(questions: IQuestion[]): IQuestion[] {
    for(let i = questions.length - 1; i >= 1; i--) {
        const j = intRandom(0, i);
        const tmp = questions[i];

        questions[i] = questions[j];
        questions[j] = tmp;
    }

    return questions;
};

export {IQuestion, QuestionType, IKanji};
