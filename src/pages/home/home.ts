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

  editCatalog(fab: FabContainer) {
    fab.close();
    this.editMode = !this.editMode;
  }

  openEdit(catalogName: string) {
    this.navCtrl.push(NewCatalogPage, {catalogName: catalogName});
  }

  openCatalog(catalogName: string) {
    this.navCtrl.push(CatalogPage, {catalogName: catalogName});

  }
}
