import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {CatalogsService, Word} from "../../services/catalogs.service";
import {NewWordPage} from "../new-word/new-word";
import {NewCatalogPage} from "../new-catalog/new-catalog";
import {FabContainer} from "ionic-angular"

@IonicPage()
@Component({
  selector: 'page-catalog',
  templateUrl: 'catalog.html',
})
export class CatalogPage {
  private name: string = "";
  private words: Word[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private catalogService: CatalogsService, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalogPage');
    console.log(this.navParams.get('catalogName').wordList);
  }

  ionViewWillEnter() {
    this.name = this.navParams.get('catalogName').catalogName;
    this.words = this.navParams.get('catalogName').wordList;
  }

  addWord(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(NewWordPage, {create: true, catalogName: this.name, wordList: this.words});
  }

  openWord(word: Word, fab: FabContainer) {
    console.log("openWord", word);
    fab.close();
    // this.modalCtrl.create(NewWordPage, {create: false, catalogName: this.name, word: word}).present();
    this.navCtrl.push(NewWordPage, {create: false, catalogName: this.name, word: word});
  }


  editCatalog(fab: FabContainer) {
    console.log("edit catalog func", this.name);
    fab.close();
    this.navCtrl.push(NewCatalogPage, {create: false, catalogName: this.name});
  }

  deleteCatalog(fab: FabContainer) {
    fab.close();
    this.catalogService.deleteCatalog(this.name);
    this.navCtrl.pop();
  }
}
