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
    let cat = new Catalog();
    cat.catalogName = catalogName;
    cat.wordList = [];
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
    if (word.catalog) {
      for (let c of this.catalogs) {
        console.log("c name=", c.catalogName)
        if (c.catalogName['catalogName'] == word.catalog) {
          c.wordList.push(word);
          console.log("EXISTS!!!", c.wordList, this.catalogs);
          this.storage.set('catalogs', this.catalogs);
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

}
