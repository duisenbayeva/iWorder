import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Catalog, CatalogsService} from "../../services/catalogs.service";
import {NewCatalogPage} from "../new-catalog/new-catalog";
import {CatalogPage} from "../catalog/catalog";
import {FabContainer} from "ionic-angular";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private catalogs: Catalog[] = [];
  private editMode: boolean = false;
  private deleteMode: boolean = false;

  constructor(public navCtrl: NavController, private catalogsService: CatalogsService) {
  }

  ionViewWillEnter() {
    this.catalogsService.getCatalogs().then(
      (catalogs) => this.catalogs = catalogs
    );
  }

  createCatalog(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(NewCatalogPage);
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

  openEdit(catalogName: string) {
    this.navCtrl.push(NewCatalogPage, {create: false, catalogName: catalogName});
  }

  openCatalog(catalogName: string) {
    this.navCtrl.push(CatalogPage, {create: true, catalogName: catalogName});

  }
}
