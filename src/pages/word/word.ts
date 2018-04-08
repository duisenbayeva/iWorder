import {Component} from "@angular/core";
import {AlertController, IonicPage, NavController, NavParams, ViewController} from "ionic-angular";
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
              private viewCtrl: ViewController,
              public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.word = this.navParams.get('word');
  }

  onDeleteWord() {
    this.showConfirm(this.word);
  }


  dismiss() {
    this.viewCtrl.dismiss();
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
