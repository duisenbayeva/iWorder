import {Word} from "./word.model";

export class Question {
  public questionWord: Word;
  public flashCardFlipped: boolean = false;
  public answers: { answer: string, correct: boolean, selected: boolean }[];


  constructor(questionWord: Word, answers: { answer: string; correct: boolean; selected: boolean }[]) {
    this.questionWord = questionWord;
    this.answers = answers;
  }
}
