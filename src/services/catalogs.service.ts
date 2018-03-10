import {Storage} from '@ionic/storage';
import {Injectable} from "@angular/core";

@Injectable()
export class CatalogsService {

  private catalogs: Catalog[] = [];

  constructor(private storage: Storage) {
  }

  addCatalog(catalogName) {
    for (let c of this.catalogs) {
      console.log("c name=", c.catalogName['catalogName'], catalogName)
      if (c.catalogName['catalogName'] == catalogName.catalogName) {
        console.error("EXISTS!!!")
        return;
      }
    }
    let cat = new Catalog(catalogName, []);
    console.log("New catalog!")
    this.catalogs.push(cat);
    this.storage.set('catalogs', this.catalogs);
  }

  getCatalogs() {
    return this.storage.get('catalogs')
      .then(
        (catalogs) => {
          this.catalogs = catalogs == null ? [] : catalogs;
          return this.catalogs.slice();
        }
      );
  }

  addWordToCatalog(word: Word) {
    console.log("addWordToCatalog function input=", word);
    let wordExist = false;
    if (word.catalog) {
      for (let c of this.catalogs) {
        console.log("c name=", c.catalogName)
        if (c.catalogName['catalogName'] == word.catalog) {
          for (let w of c.wordList) {
            console.log("w=", w.word);
            if (w.word == word.word) {
              wordExist = true;
              console.log("word exists")
              break;
            }
          }
          if (!wordExist) {
            c.wordList.push(word);
            console.log("WORD was added", c.wordList, this.catalogs);
            this.storage.set('catalogs', this.catalogs);
            return;
          }
          return;
        }
      }
    }
  }
}

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

export class Catalog {
  public catalogName: string;
  public wordList: Word[];


  constructor(catalogName: string, wordList: Word[]) {
    this.catalogName = catalogName;
    this.wordList = wordList;
  }
}
