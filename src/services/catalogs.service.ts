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

    if (!(catalogName in this.catalogs2)) {
      catalogs2[catalogName] = {"catalogName": catalogName, "wordList": {}};
      localStorage.setItem('catalogsMap', JSON.stringify(catalogs2));
      this.updateCatalogList();

    }

    console.log("catalog exists")
  }

  getCatalogs() {
    return this.storage.get('catalogs')
      .then(
        (catalogs) => {
          this.catalogs = catalogs == null ? [] : catalogs;
          console.log("catalogs=", this.catalogs);
          return this.catalogs.slice();
        }
      );
  }

  editCatalog(catalogName, newName) {
    let catalogs2 = localStorage.getItem('catalogsMap') ? JSON.parse(localStorage.getItem('catalogsMap')) : {};

    if (catalogName in catalogs2) {
      catalogs2[newName] = {
        "catalogName": newName, "wordList": catalogs2[catalogName].wordList
      };
      delete catalogs2[catalogName];
      localStorage.setItem('catalogsMap', JSON.stringify(catalogs2));
      this.updateCatalogList();
    } else {
      console.log("was not found to edit")
    }
  }

  addWordToCatalog(word: Word) {
    console.log("addWordToCatalog function input=", word);
    let catalogs2 = localStorage.getItem('catalogsMap') ? JSON.parse(localStorage.getItem('catalogsMap')) : {};

    if (word.catalog in catalogs2) {
      if (!(word.word in catalogs2[word.catalog].wordList)) {
        catalogs2[word.catalog].wordList[word.word] = word;
        localStorage.setItem('catalogsMap', JSON.stringify(catalogs2));
        this.updateCatalogList();
        return;
      }
    }

    console.log("Word was not added");

  }

  editWord(word: Word, newWord: Word) {
    console.log("editWord function input=", word, newWord);
    let catalogs2 = localStorage.getItem('catalogsMap') ? JSON.parse(localStorage.getItem('catalogsMap')) : {};

    if (word.catalog in catalogs2) {
      if (word.word in catalogs2[word.catalog].wordList) {
        delete catalogs2[word.catalog].wordList[word.word];
        catalogs2[newWord.catalog].wordList[newWord.word] = newWord;
        localStorage.setItem('catalogsMap', JSON.stringify(catalogs2));
        this.updateCatalogList();
        return;
      }
    }
    console.log("Word was not added");

  }

  deleteCatalog(catalogName) {
    console.log("deleteCatalog service input =", catalogName);
    let catalogs2 = localStorage.getItem('catalogsMap') ? JSON.parse(localStorage.getItem('catalogsMap')) : {};
    if (catalogName in catalogs2) {
      delete catalogs2[catalogName];
      localStorage.setItem('catalogsMap', JSON.stringify(catalogs2));
      this.updateCatalogList();
      return;
    }
    console.log("Catalog was not deleted");
  }

  getCatalog(catalogName){
    let catalogs2 = localStorage.getItem('catalogsMap') ? JSON.parse(localStorage.getItem('catalogsMap')) : {};
    let catalog = new Catalog(catalogName,[]);
    if (catalogName in catalogs2) {
      catalog.wordList = Object.keys(catalogs2[catalogName].wordList).map(function (val) {
        return catalogs2[catalogName].wordList[val];
      });
      return catalog;
    }
  }

  deleteWord(word: Word) {
    console.log("deleteWord service input =", word);
    let catalogs2 = localStorage.getItem('catalogsMap') ? JSON.parse(localStorage.getItem('catalogsMap')) : {};

    if (word.catalog in catalogs2) {
      if (word.word in catalogs2[word.catalog].wordList) {
        delete catalogs2[word.catalog].wordList[word.word];
        localStorage.setItem('catalogsMap', JSON.stringify(catalogs2));
        this.updateCatalogList();
        return;
      }
    }
    console.log("Word was not deleted");
  }

  updateCatalogList = function () {
    let catalogs2 = localStorage.getItem('catalogsMap') ? JSON.parse(localStorage.getItem('catalogsMap')) : {};
    this.catalogs = [];
    this.catalogs = Object.keys(catalogs2).map(function (val) {
      catalogs2[val].wordList = Object.keys(catalogs2[val].wordList).map(function (val2) {
        return catalogs2[val].wordList[val2];
      });
      return catalogs2[val];
    });
    this.storage.set('catalogs', this.catalogs);
  }

}


