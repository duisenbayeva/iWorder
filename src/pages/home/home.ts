import {Component} from "@angular/core";
import {FabContainer, NavController} from "ionic-angular";
import {CatalogsService} from "../../services/catalogs.service";
import {NewCatalogPage} from "../new-catalog/new-catalog";
import {CatalogPage} from "../catalog/catalog";
import {GamePage} from "../game/game";
import {Catalog} from "../../model/catalog.model";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private catalogs: any[] = [];
  private editMode: boolean = false;
  private deleteMode: boolean = false;

  constructor(public navCtrl: NavController, private catalogsService: CatalogsService, private catalogService: CatalogsService) {
  }

  ionViewWillEnter() {
    this.catalogsService.getCatalogs().then(
      (catalogs) => this.catalogs = catalogs
    );
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
    fab.close();
    this.navCtrl.push(NewCatalogPage, {"create": false, "catalogName": catalog.catalogName});
  }

  deleteCatalog(catalog, fab: FabContainer) {
    event.preventDefault();
    event.stopPropagation();
    fab.close();
    this.catalogService.deleteCatalog(catalog.catalogName);
    this.ionViewWillEnter();
  }

  openCatalog(catalog: Catalog, fab: FabContainer) {
    fab.close();
    console.log("cat to send", catalog);
    this.navCtrl.push(CatalogPage, {"catalog": catalog});

  }

  openGame(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(GamePage);
  }
}
