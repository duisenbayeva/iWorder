import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCatalogPage } from './new-catalog';

@NgModule({
  declarations: [
    NewCatalogPage,
  ],
  imports: [
    IonicPageModule.forChild(NewCatalogPage),
  ],
})
export class NewCatalogPageModule {}
