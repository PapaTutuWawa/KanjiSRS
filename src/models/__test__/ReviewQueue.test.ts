import { IKanji, QuestionType } from "../Review";
import { generateQuestionQueue } from "../ReviewQueue";

test("generates a review queue", () => {
    /*
      Generate a review queue and check if we have both a meaning and a
      reading question included
     */
    const kanji: IKanji[] = [{
        char: "a",
        reading: "a1",
        meaning: "a2",
    }, {
        char: "b",
        reading: "b1",
        meaning: "b2",
    }];

    const queue = generateQuestionQueue(kanji);
    const typePair = [QuestionType.Reading, QuestionType.Meaning];
    expect(queue.map((q) => q.type)).toEqual(typePair.concat(typePair));
});
