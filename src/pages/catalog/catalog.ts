import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Word} from "../../services/catalogs.service";
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalogPage');
    console.log(this.navParams.get('catalogName').wordList);
  }

  ionViewWillEnter() {
    this.name = this.navParams.get('catalogName').catalogName;
    this.words = this.navParams.get('catalogName').wordList;
  }

  addWord() {
    this.navCtrl.push(NewWordPage, {create: true, catalogName: this.name, wordList: this.words});
  }

  openWord(word: Word) {
    console.log("openWord", word)
    this.navCtrl.push(NewWordPage, {create: false, catalogName: this.name, word: word});
  }


  editCatalog(fab: FabContainer) {
    console.log("edit catalof func", this.name);
    fab.close();
    this.navCtrl.push(NewCatalogPage, {create: false, catalogName: this.name});
  }

  deleteCatalog(fab: FabContainer) {
    fab.close();

  }
}
