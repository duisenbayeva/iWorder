import {Component, ViewChild} from "@angular/core";
import {
  AlertController,
  FabContainer,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Platform
} from "ionic-angular";
import {CatalogsService} from "../../services/catalogs.service";
import {NewWordPage} from "../new-word/new-word";
import {Word} from "../../model/word.model";
import {WordPage} from "../word/word";
import {GamePage} from "../game/game";

import {Media, MediaObject} from "@ionic-native/media";
import {File} from "@ionic-native/file";

@IonicPage()
@Component({
  selector: 'page-catalog',
  templateUrl: 'catalog.html',
})
export class CatalogPage {
  private name: string = "";
  private words: any[] = [];
  private editMode: boolean = false;
  private deleteMode: boolean = false;

  @ViewChild(FabContainer) fab: FabContainer;

  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private catalogService: CatalogsService,
              private modalCtrl: ModalController,
              public alertCtrl: AlertController,
              private media: Media,
              private file: File,
              public platform: Platform) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CatalogPage', this.navParams);
    this.name = this.navParams.get('catalog').catalogName;
    // this.words = this.navParams.get('catalog').wordList;
    this.words = this.catalogService.getCatalog(this.navParams.get('catalog').catalogName).wordList;
    this.getAudioList();
  }

  ionViewWillLeave() {
    console.log("will leave", this.fab);
    this.fab.close();
    this.editMode = false;
    this.deleteMode = false;
  }

  getAudioList() {
    if (localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }

  startRecord() {
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
    this.audio.stopRecord();
    let data = {filename: this.fileName};
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  }

  playAudio(file, idx) {
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

  addWord(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(NewWordPage, {create: true, catalogName: this.name, wordList: this.words});
  }

  editWordMode(fab: FabContainer) {
    fab.close();
    this.deleteMode = false;
    this.editMode = !this.editMode;
  }

  deleteWordMode(fab: FabContainer) {
    fab.close();
    this.editMode = false;
    this.deleteMode = !this.deleteMode;
  }

  editWord(word, fab: FabContainer) {
    event.preventDefault();
    event.stopPropagation();
    console.log("edit word func", word);
    fab.close();
    this.navCtrl.push(NewWordPage, {create: false, catalogName: this.name, word: word});
  }

  deleteWord(word, fab: FabContainer) {
    event.preventDefault();
    event.stopPropagation();
    console.log("delete word func", word);
    fab.close();
    this.showConfirm(word);
  }

  openWord(word: Word, fab: FabContainer) {
    console.log("openWord", word);
    fab.close();
    let wordModal = this.modalCtrl.create(WordPage, {catalogName: this.name, word: word});
    wordModal.present();
    wordModal.onDidDismiss(() => {
      this.ionViewWillEnter();
    })
  }

  openGame(fab: FabContainer) {
    fab.close();
    console.log(this.name, this.words);
    if (this.words.length < 3)
      console.log("You should have 3 words in the catalog to start game session");
    else
      this.navCtrl.push(GamePage, {catalogName: this.name, wordList: this.words});
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
            this.catalogService.deleteWord(word);
            this.ionViewWillEnter();
          }
        }
      ]
    });
    confirm.present();
  }

}
