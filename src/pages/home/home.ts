import {Component, ViewChild} from "@angular/core";
import {AlertController, FabContainer, IonicPage, NavController} from "ionic-angular";
import {CatalogsService} from "../../services/catalogs.service";
import {NewCatalogPage} from "../new-catalog/new-catalog";
import {CatalogPage} from "../catalog/catalog";
import {GamePage} from "../game/game";
import {Catalog} from "../../model/catalog.model";
import {AuthProvider} from "../../providers/auth/auth";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private catalogs: any[] = [];
  private editMode: boolean = false;
  private deleteMode: boolean = false;

  @ViewChild(FabContainer) fab: FabContainer;

  constructor(public navCtrl: NavController,
              private catalogsService: CatalogsService,
              private catalogService: CatalogsService,
              public alertCtrl: AlertController, public authData: AuthProvider) {
  }

  ionViewWillEnter() {
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
      title: 'Delete',
      message: "Are you sure to delete catalog " + catalogName + "? It may contain words",
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
            this.catalogService.deleteCatalog(catalogName);
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
          }
        }
      ]
    });
    confirm.present();
  }

  logoutUser() {
    console.log("log out");
    this.authData.logoutUser()
      .then(() => {
        this.navCtrl.setRoot(LoginPage);
      }, (error) => {
        this.loading.dismiss().then(() => {
          var errorMessage: string = error.message;
          let alert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
  }
}
