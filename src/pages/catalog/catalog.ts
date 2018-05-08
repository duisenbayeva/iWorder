import {Component, ViewChild} from "@angular/core";
import {
  AlertController,
  FabContainer,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import {CatalogsService} from "../../services/catalogs.service";
import {NewWordPage} from "../new-word/new-word";
import {Word} from "../../model/word.model";
import {WordPage} from "../word/word";
import {GamePage} from "../game/game";
import {TranslateService} from "ng2-translate";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private catalogService: CatalogsService,
              private modalCtrl: ModalController,
              public alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private translate: TranslateService) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CatalogPage', this.navParams);
    this.name = this.navParams.get('catalog').catalogName;
    // this.words = this.navParams.get('catalog').wordList;
    let catalog;
    if (catalog = this.catalogService.getCatalog(this.navParams.get('catalog').catalogName)) {
      console.log("catalog!!!", catalog);
      this.words = catalog.wordList;
    }
  }

  ionViewWillLeave() {
    console.log("will leave", this.fab);
    this.fab.close();
    this.editMode = false;
    this.deleteMode = false;
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
    let wordModal = this.modalCtrl.create(WordPage, {catalogName: this.name, word: word}, {cssClass: "mymodal"});
    wordModal.present();
    wordModal.onDidDismiss(() => {
      this.ionViewWillEnter();
    })
  }

  openGame(fab: FabContainer) {
    fab.close();
    console.log(this.name, this.words);
    if (this.words.length < 5)
      this.presentToast(this.translate.instant("MINIMUMWORDSCOUNTMESSAGE"));
    else
      this.navCtrl.push(GamePage, {catalogName: this.name, wordList: this.words});
  }

  presentToast(toastMessage) {
    let toast = this.toastCtrl.create({
      message: toastMessage,
      duration: 4000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
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
            this.catalogService.deleteWord(word);
            this.ionViewWillEnter();
          }
        }
      ]
    });
    confirm.present();
  }

}
