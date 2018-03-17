export class Word {
  public word: string;
  public translation: string;
  public note: string;
  public catalog: string;


  constructor(word: string, translation: string, note: string, catalog: string) {
    this.word = word;
    this.translation = translation;
    this.note = note;
    this.catalog = catalog;
  }
}
