import {Component} from "@angular/core";
import {AlertController, IonicPage, NavController, NavParams} from "ionic-angular";
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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private catalogsService: CatalogsService,
              public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter NewWordPage', this.navParams);
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
    this.catalogsService.addWordToCatalog(this.word);
    this.navCtrl.pop();
  }

  onEditWord() {
    console.log("edit! create=", this.create, this.word, this.oldWord)
    this.catalogsService.editWord(this.oldWord, this.word);
    this.navCtrl.pop();
  }

  onDeleteWord() {
    this.showConfirm(this.word);
  }

  showConfirm(word) {
    let confirm = this.alertCtrl.create({
      title: 'Delete',
      message: "Are you sure to delete word " + word.word + "?",
      buttons: [
        {
          text: 'cancel',
          handler: () => {
            // alert('Disagree clicked');
          }
        },
        {
          text: 'delete',
          handler: () => {
            this.catalogsService.deleteWord(word);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }


}
