import {Component, ViewChild} from "@angular/core";
import {AlertController, FabContainer, IonicPage, NavController} from "ionic-angular";
import {CatalogsService} from "../../services/catalogs.service";
import {NewCatalogPage} from "../new-catalog/new-catalog";
import {CatalogPage} from "../catalog/catalog";
import {GamePage} from "../game/game";
import {Catalog} from "../../model/catalog.model";
import {TranslateService} from "ng2-translate";
import {FirestoreProvider} from "../../providers/firestore/firestore";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  private catalogs: any[] = [];
  private editMode: boolean = false;
  private deleteMode: boolean = false;

  catalogList: any;


  @ViewChild(FabContainer) fab: FabContainer;

  constructor(public navCtrl: NavController,
              private catalogsService: CatalogsService,
              private catalogService: CatalogsService,
              public alertCtrl: AlertController,
              private translate: TranslateService,
              private firestore: FirestoreProvider) {

  }


  ionViewWillEnter() {
    if (localStorage.getItem('defaultLang')) {
      this.translate.setDefaultLang(localStorage.getItem('defaultLang'));
      this.translate.use(localStorage.getItem('defaultLang'));
    } else {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }
    this.catalogsService.getCatalogs().then(
      (catalogs) => this.catalogs = catalogs
    );
  }

  ionViewWillLeave() {
    console.log("will leave", this.fab);
    this.fab.close();
    this.editMode = false;
    this.deleteMode = false;
  }

  ionViewDidLoad() {
    this.firestore.getAllDocuments("word_catalogs").then((e) => {
      this.catalogList = e;
      console.log("catalogList from Firebase", this.catalogList);
    });
  }

  createCatalog(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(NewCatalogPage, {create: true, catalogName: ""});
  }

  editCatalogMode(fab: FabContainer) {
    fab.close();
    this.deleteMode = false;
    this.editMode = !this.editMode;
  }

  deleteCatalogMode(fab: FabContainer) {
    fab.close();
    this.editMode = false;
    this.deleteMode = !this.deleteMode;
  }

  editCatalog(catalog, fab: FabContainer) {
    event.preventDefault();
    event.stopPropagation();
    console.log("edit catalog func", catalog);
    // fab.close();
    this.navCtrl.push(NewCatalogPage, {"create": false, "catalogName": catalog.catalogName});
  }

  deleteCatalog(catalog, fab: FabContainer) {
    event.preventDefault();
    event.stopPropagation();
    fab.close();
    this.showConfirm(catalog.catalogName);
  }

  openCatalog(catalog: Catalog, fab: FabContainer) {
    // fab.close();
    console.log("cat to send", catalog);
    this.navCtrl.push(CatalogPage, {"catalog": catalog});

  }

  openGame(fab: FabContainer) {
    // fab.close();
    this.navCtrl.push(GamePage);
  }

  showConfirm(catalogName) {
    let confirm = this.alertCtrl.create({
      title: this.translate.instant("DELETE"),
      message: this.translate.instant("CONFIRMDELETECATALOG") + catalogName + this.translate.instant("CONFIRMDELETECATALOG2"),
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
            this.catalogService.deleteCatalog(catalogName);
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
          }
        }
      ]
    });
    confirm.present();
  }
}
