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

  onClickNewWord() {
    this.navCtrl.push(NewWordPage, {create: true, catalogName: this.name, wordList: this.words});
  }

  openWord(word: Word) {
    console.log("openWord", word)
    this.navCtrl.push(NewWordPage, {create: false, catalogName: this.name, word: word});
  }

}
