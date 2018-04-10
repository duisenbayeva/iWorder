import {Component} from "@angular/core";
import {AlertController, IonicPage, NavController, NavParams, Platform, ViewController} from "ionic-angular";
import {Word} from "../../model/word.model";
import {CatalogsService} from "../../services/catalogs.service";

import {Media} from "@ionic-native/media";
import {File} from "@ionic-native/file";

@IonicPage()
@Component({
  selector: 'page-word',
  templateUrl: 'word.html',
})
export class WordPage {
  private word: Word = new Word("", "", "", this.navParams.get('catalogName'));

  filePath: string;
  audio: MediaObject;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private catalogsService: CatalogsService,
              private viewCtrl: ViewController,
              public alertCtrl: AlertController,
              private media: Media,
              private file: File,
              public platform: Platform) {
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

  playAudio(file) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
  }


}
