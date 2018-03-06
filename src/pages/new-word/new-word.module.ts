import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewWordPage } from './new-word';

@NgModule({
  declarations: [
    NewWordPage,
  ],
  imports: [
    IonicPageModule.forChild(NewWordPage),
  ],
})
export class NewWordPageModule {}
