import { IKanji } from "../models/Review";

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

/*
  TODO: Actually retrieve the username from somewhere
 */
export function getUsername(): string {
    return "Polynomdivision";
};
