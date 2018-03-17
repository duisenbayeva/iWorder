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

    let catalogs2 = localStorage.getItem('catalogsMap') ? JSON.parse(localStorage.getItem('catalogsMap')) : {};

    if (catalogName in this.catalogs2) {
      console.log("catalog exists in map")
    } else {
      catalogs2[catalogName] = {"catalogName": catalogName, "wordList": {"word": {}}};
      console.log("Saved catalog in map", JSON.stringify(catalogs2));
      localStorage.setItem('catalogsMap', JSON.stringify(catalogs2));
      this.catalogs = [];
      this.catalogs = Object.keys(catalogs2).map(function (val) {
        console.log("asd ", catalogs2[val]);
        catalogs2[val].wordList = Object.keys(catalogs2[val].wordList).map(function (val2) {
          return catalogs2[val].wordList[val2];
        });
        return catalogs2[val];
      });
      console.log(this.catalogs);
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
    let catalogs2 = localStorage.getItem('catalogsMap') ? JSON.parse(localStorage.getItem('catalogsMap')) : {};

    if (catalogName in catalogs2) {
      console.log("catalog exists in map to edit")
      catalogs2[newName] = {
        "catalogName": newName, "wordList": catalogs2[catalogName].wordList
      };
      delete catalogs2[catalogName];
      console.log("Saved catalog in map", JSON.stringify(catalogs2));
      localStorage.setItem('catalogsMap', JSON.stringify(catalogs2));
      this.catalogs = [];
      this.catalogs = Object.keys(catalogs2).map(function (val) {
        catalogs2[val].wordList = Object.keys(catalogs2[val].wordList).map(function (val2) {
          return catalogs2[val].wordList[val2];
        });
        return catalogs2[val];
      });
      console.log(this.catalogs);
      this.storage.set('catalogs', this.catalogs);
    } else {
      console.log("was not found to edit")
    }
  }

  addWordToCatalog(word: Word) {
    console.log("addWordToCatalog function input=", word);
    let catalogs2 = localStorage.getItem('catalogsMap') ? JSON.parse(localStorage.getItem('catalogsMap')) : {};
    let success = false;
    if (word.catalog in catalogs2) {
      if (!(word.word in catalogs2[word.catalog].wordList)) {
        catalogs2[word.catalog].wordList[word.word] = word;
        console.log("Word in map", catalogs2[word.catalog].wordList[word.word]);
        console.log("Saved in map", JSON.stringify(catalogs2));
        localStorage.setItem('catalogsMap', JSON.stringify(catalogs2));
        this.catalogs = [];
        this.catalogs = Object.keys(catalogs2).map(function (val) {
          catalogs2[val].wordList = Object.keys(catalogs2[val].wordList).map(function (val2) {
            return catalogs2[val].wordList[val2];
          });
          return catalogs2[val];
        });
        console.log("List=", this.catalogs);
        this.storage.set('catalogs', this.catalogs);
        return;
      }
    }
    if (!success) {
      console.log("Word was not added");
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


