import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {CatalogPage} from "./catalog";
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [
    CatalogPage,
  ],
  imports: [
    IonicPageModule.forChild(CatalogPage), TranslateModule
  ],
})
export class CatalogPageModule {
}
