import {Component, ElementRef, ViewChild} from "@angular/core";
import {FabContainer, IonicPage, ModalController, NavController, NavParams} from "ionic-angular";
import {CatalogsService} from "../../services/catalogs.service";
import {NewWordPage} from "../new-word/new-word";
import {Word} from "../../model/word.model";
import {WordPage} from "../word/word";
import {GamePage} from "../game/game";

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

  @ViewChild('fab') fab: ElementRef;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private catalogService: CatalogsService,
              private modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CatalogPage', this.navParams);
    this.name = this.navParams.get('catalog').catalogName;
    // this.words = this.navParams.get('catalog').wordList;
    this.words = this.catalogService.getCatalog(this.navParams.get('catalog').catalogName).wordList;
  }

  ionViewWillLeave() {
    console.log("will leave", this.fab);
    this.fab.close();
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
    this.catalogService.deleteWord(word);
    this.ionViewWillEnter();
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


}
