import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {CatalogsService} from "../../services/catalogs.service";
import {Word} from "../../model/word.model";

@IonicPage()
@Component({
  selector: 'page-new-word',
  templateUrl: 'new-word.html',
})
export class NewWordPage {

  private create: boolean = true;
  private word: Word = new Word("", "", "", this.navParams.get('catalogName'));
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
      this.word = JSON.parse(JSON.stringify(this.navParams.get('word')));
      this.oldWord = new Word(this.word.word, this.word.translation, this.word.note, this.word.catalog);
    } else {
      this.word = new Word("", "", "", this.navParams.get('catalogName'))
    }
    console.log("create=", this.create, this.word)
  }

  onAddWord() {
    // console.log("Value=", value);
    // let word = new Word(value.newWord, value.translation, value.note, this.navParams.get('catalogName').catalogName);
    this.catalogsService.addWordToCatalog(this.word);
    this.navCtrl.pop();
  }

  onEditWord() {
    console.log("edit! create=", this.create, this.word, this.oldWord)
    this.catalogsService.editWord(this.oldWord, this.word);
    this.navCtrl.pop();
  }

  onDeleteWord() {
    this.catalogsService.deleteWord(this.word);
    this.navCtrl.pop();
  }


}
