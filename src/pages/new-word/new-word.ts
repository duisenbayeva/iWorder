import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CatalogsService, Word} from "../../services/catalogs.service";

@IonicPage()
@Component({
  selector: 'page-new-word',
  templateUrl: 'new-word.html',
})
export class NewWordPage {

  private create: boolean = true;
  private word: Word = new Word("", "", "", this.navParams.get('catalogName').catalogName);
  private oldWord: Word;

  constructor(public navCtrl: NavController, public navParams: NavParams, private catalogsService: CatalogsService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewWordPage');
    console.log(this.navParams);
  }

  ionViewWillEnter() {
    this.create = this.navParams.get('create');
    if (!this.create) {
      this.word = this.navParams.get('word');
      this.oldWord = new Word(this.word.word, this.word.translation, this.word.note, this.word.catalog);
    } else {
      this.word = new Word("", "", "", this.navParams.get('catalogName').catalogName)
    }
    console.log("create=", this.create, this.word)
  }

  onAddWord(value) {
    console.log("Value=", value);
    let word = new Word(value.newWord, value.translation, value.note, this.navParams.get('catalogName').catalogName);
    this.catalogsService.addWordToCatalog(word);
    this.navCtrl.pop();
  }

  onEditWord(value) {
    console.log("edit! create=", this.create, value, this.oldWord)
  }


}
