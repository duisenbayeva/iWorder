import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {QuizPage} from "../quiz/quiz";

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

  ionViewWillEnter() {
    console.log("will enter")
  }

  startMcq() {
    console.log("start mcq");
    this.navCtrl.push(QuizPage);
  }

}
