import {Component} from "@angular/core";
import {AlertController, IonicPage, NavController, NavParams, Platform} from "ionic-angular";
import {CatalogsService} from "../../services/catalogs.service";
import {Word} from "../../model/word.model";
import {Media, MediaObject} from "@ionic-native/media";
import {File} from "@ionic-native/file";
import {TranslateService} from "ng2-translate";

@IonicPage()
@Component({
  selector: 'page-new-word',
  templateUrl: 'new-word.html',
})
export class NewWordPage {

  private create: boolean = true;
  private word: Word = new Word("", "", "", this.navParams.get('catalogName'));
  private oldWord: Word;

  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private catalogsService: CatalogsService,
              public alertCtrl: AlertController,
              private media: Media,
              private file: File,
              public platform: Platform,
              private translate: TranslateService) {
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
      title: this.translate.instant("DELETE"),
      message: this.translate.instant("CONFIRMDELETEWORD") + word.word + "?",
      buttons: [
        {
          text: this.translate.instant("CANCELBTN"),
          handler: () => {
            // alert('Disagree clicked');
          }
        },
        {
          text: this.translate.instant("DELETEBTN"),
          handler: () => {
            this.catalogsService.deleteWord(word);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }


  startRecord() {
    event.preventDefault();
    event.stopPropagation();
    if (this.platform.is('ios')) {
      this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;
  }

  stopRecord() {
    event.preventDefault();
    event.stopPropagation();
    this.audio.stopRecord();
    this.word.recordFileName = this.fileName;
    this.recording = false;
  }

  playAudio(file) {
    event.preventDefault();
    event.stopPropagation();

    console.log("play audio");
    this.audio.play();
    this.audio.setVolume(0.8);
  }

  onDeleteWordRecord() {
    console.log("delete record", this.word.recordFileName);
    this.word.recordFileName = "";
    if (this.platform.is('ios')) {
      this.file.removeFile(this.file.documentsDirectory.replace(/file:\/\//g, ''), this.fileName);
    } else if (this.platform.is('android')) {
      this.file.removeFile(this.file.externalDataDirectory.replace(/file:\/\//g, ''), this.fileName);
    }

  }

}
