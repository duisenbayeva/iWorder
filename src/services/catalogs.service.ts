import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";
import {Word} from "../model/word.model";
import {Catalog} from "../model/catalog.model";

@Injectable()
export class CatalogsService {

  private catalogs: Catalog[] = [];
  private catalogs2: {} = {};

  constructor(private storage: Storage) {
  }

  addCatalog(catalogName) {

    this.catalogs2 = localStorage.getItem('catalogsMap') ? JSON.parse(localStorage.getItem('catalogsMap')) : {};

    if (catalogName in this.catalogs2) {
      console.log("catalog exists in map")
    } else {
      let cat = new Catalog(catalogName, []);
      this.catalogs2[catalogName] = cat;
      console.log("Saved catalog in map", this.catalogs2);
      this.catalogs = [];
      for (let i in this.catalogs2) {
        this.catalogs.push(this.catalogs2[i]);
      }
      console.log(this.catalogs);
      localStorage.setItem('catalogsMap', JSON.stringify(this.catalogs2));
      this.storage.set('catalogs', this.catalogs);
    }
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

  editCatalog(catalogName, newName) {
    this.catalogs2 = localStorage.getItem('catalogsMap') ? JSON.parse(localStorage.getItem('catalogsMap')) : {};

    if (catalogName in this.catalogs2) {
      console.log("catalog exists in map to edit")
      let newCat = new Catalog(newName, this.catalogs2[catalogName].wordList);
      this.catalogs2[newName] = newCat;
      delete this.catalogs2[catalogName];
      console.log("Saved catalog in map", this.catalogs2);
      this.catalogs = [];
      for (let i in this.catalogs2) {
        this.catalogs.push(this.catalogs2[i]);
      }
      console.log(this.catalogs);
      localStorage.setItem('catalogsMap', JSON.stringify(this.catalogs2));
      this.storage.set('catalogs', this.catalogs);
    } else {
      console.log("was not found to edit")
    }
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

  editWord(word: Word, newWord: Word) {
    console.log("editWord function input=", word, newWord, this.catalogs);
    let wordExist = false;
    if (word.catalog) {
      for (let c of this.catalogs) {
        console.log("c name=", c.catalogName)
        if (c.catalogName['catalogName'] == word.catalog) {
          let index = 0;
          for (let w of c.wordList) {
            console.log("w=", w.word);
            if (w.word == word.word) {
              wordExist = true;
              c.wordList[index] = newWord;
              console.log("word exists, going to change now", w, this.catalogs);
              this.storage.set('catalogs', this.catalogs);
              return;
            }
            index++;
          }
          if (!wordExist) {
            console.log("WORD do not exist! error");
            return;
          }
        }
      }
    }
  }

  deleteCatalog(catalogName) {
    console.log("deleteCatalog service input =", catalogName);
    let catalogDeleted = false;
    let index = 0;
    for (let c of this.catalogs) {
      console.log("c name=", c.catalogName['catalogName'], catalogName)
      if (c.catalogName['catalogName'] == catalogName.catalogName) {
        this.catalogs.splice(index, 1);
        console.log("Found!!!")
        catalogDeleted = true;
        this.storage.set('catalogs', this.catalogs);
        return;
      }
      index++;
    }
    if (!catalogDeleted) {
      console.log("Catalog was not deleted error");
      return;
    }

  }

  deleteWord(word: Word) {
    console.log("deleteWord service input =", word);
    let wordDeleted = false;
    if (word.catalog) {
      for (let c of this.catalogs) {
        console.log("c name=", c.catalogName)
        if (c.catalogName['catalogName'] == word.catalog) {
          let index = 0;
          for (let w of c.wordList) {
            console.log("w=", w.word);
            if (w.word == word.word) {
              wordDeleted = true;
              c.wordList.splice(index, 1);
              console.log("word exists, deleted", this.catalogs);
              this.storage.set('catalogs', this.catalogs);
              return;
            }
            index++;
          }
          if (!wordDeleted) {
            console.log("WORD was not deleted error");
            return;
          }
        }
      }
    }
  }
}


