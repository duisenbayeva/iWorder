import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Word} from "../../services/catalogs.service";
import {NewWordPage} from "../new-word/new-word";

@IonicPage()
@Component({
  selector: 'page-catalog',
  templateUrl: 'catalog.html',
})
export class CatalogPage {
  private name: string = this.navParams.get('catalogName').catalogName;
  private words: Word[] = this.navParams.get('catalogName').wordList;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalogPage');
    console.log(this.navParams.get('catalogName').wordList);
  }

  onClickNewWord() {
    this.navCtrl.push(NewWordPage, {catalogName: this.name, wordList: this.words});
  }

}
