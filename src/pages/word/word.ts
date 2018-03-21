import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Word} from "../../model/word.model";
import {CatalogsService} from "../../services/catalogs.service";

@IonicPage()
@Component({
  selector: 'page-word',
  templateUrl: 'word.html',
})
export class WordPage {
  private word: Word = new Word("", "", "", this.navParams.get('catalogName'));

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private catalogsService: CatalogsService,
              private viewCtrl: ViewController) {
  }

  ionViewWillEnter() {
    this.word = this.navParams.get('word');
  }

  onDeleteWord() {
    this.catalogsService.deleteWord(this.word);
    this.navCtrl.pop();
  }


  dismiss(){
    this.viewCtrl.dismiss();
  }



}
