import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { McqPage } from './mcq';

@NgModule({
  declarations: [
    McqPage,
  ],
  imports: [
    IonicPageModule.forChild(McqPage),
  ],
})
export class McqPageModule {}
