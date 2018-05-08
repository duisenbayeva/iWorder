import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {TranslateService} from "ng2-translate";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-choose-language',
  templateUrl: 'choose-language.html',
})
export class ChooseLanguagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseLanguagePage');
  }

  english() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    localStorage.setItem('defaultLang', 'en');
    this.navCtrl.setRoot('HomePage');
  }

  russian() {
    this.translate.setDefaultLang('ru');
    this.translate.use('ru');
    localStorage.setItem('defaultLang', 'ru');
    this.navCtrl.setRoot('HomePage');
  }
}
