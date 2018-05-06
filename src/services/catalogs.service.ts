import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";
import {Word} from "../model/word.model";
import {Catalog} from "../model/catalog.model";
import {ToastController} from "ionic-angular";
import {TranslateService} from "ng2-translate";

@Injectable()
export class CatalogsService {

  private catalogs: Catalog[] = [];
  private catalogs2: {} = {};

  constructor(private storage: Storage, private toastCtrl: ToastController, private translate: TranslateService) {
  }

  addCatalog(catalogName) {

    let catalogs2 = localStorage.getItem('catalogsMap') ? JSON.parse(localStorage.getItem('catalogsMap')) : {};

    if (!(catalogName in this.catalogs2)) {
      catalogs2[catalogName] = {"catalogName": catalogName, "wordList": {}};
      localStorage.setItem('catalogsMap', JSON.stringify(catalogs2));
      this.updateCatalogList();
      this.translate.get('ADDCATALOGSUCCESS').subscribe((res: string) => {
        this.presentToast(res);
      });
      return;
    }
    this.translate.get('ADDCATALOGERROR').subscribe((res: string) => {
      this.presentToast(res);
    });
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
      this.translate.get('EDITCATALOGSUCCESS').subscribe((res: string) => {
        this.presentToast(res);
      });
    } else {
      this.translate.get('EDITCATALOGERROR').subscribe((res: string) => {
        this.presentToast(res);
      });
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
        this.translate.get('ADDWORDSUCCESS').subscribe((res: string) => {
          this.presentToast(res);
        });
        return;
      }
    }
    this.translate.get('ADDWORDERROR').subscribe((res: string) => {
      this.presentToast(res);
    });
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
        this.translate.get('EDITWORDSUCCESS').subscribe((res: string) => {
          this.presentToast(res);
        });
        return;
      }
    }
    this.translate.get('EDITWORDERROR').subscribe((res: string) => {
      this.presentToast(res);
    });

  }

  deleteCatalog(catalogName) {
    console.log("deleteCatalog service input =", catalogName);
    let catalogs2 = localStorage.getItem('catalogsMap') ? JSON.parse(localStorage.getItem('catalogsMap')) : {};
    if (catalogName in catalogs2) {
      delete catalogs2[catalogName];
      localStorage.setItem('catalogsMap', JSON.stringify(catalogs2));
      this.updateCatalogList();
      this.translate.get('DELETECATALOGSUCCESS').subscribe((res: string) => {
        this.presentToast(res);
      });
      return;
    }
    this.translate.get('DELETECATALOGERROR').subscribe((res: string) => {
      this.presentToast(res);
    });
  }

  getCatalog(catalogName) {
    let catalogs2 = localStorage.getItem('catalogsMap') ? JSON.parse(localStorage.getItem('catalogsMap')) : {};
    let catalog = new Catalog(catalogName, []);
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
        this.translate.get('DELETEWORDSUCCESS').subscribe((res: string) => {
          this.presentToast(res);
        });
        return;
      }
    }
    this.translate.get('DELETEWORDERROR').subscribe((res: string) => {
      this.presentToast(res);
    });
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

  presentToast(toastMessage) {
    let toast = this.toastCtrl.create({
      message: toastMessage,
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}


