import {Word} from "./word.model";

export class Catalog {
  public catalogName: string;
  public wordList: Word[];


  constructor(catalogName: string, wordList: Word[]) {
    this.catalogName = catalogName;
    this.wordList = wordList;
  }
}
