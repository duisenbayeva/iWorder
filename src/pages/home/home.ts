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
  private catalogs: Catalog[] = [];

  constructor(public navCtrl: NavController, private catalogsService: CatalogsService) {
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

  openCatalog(catalogName: string, fab: FabContainer) {
    fab.close();
    this.navCtrl.push(CatalogPage, {catalogName: catalogName});

  }

  openGame(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(GamePage);
  }
}
