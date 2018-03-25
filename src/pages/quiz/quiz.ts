import {Component, ViewChild} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {QuizService} from "../../services/quiz.service";

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  private questions: [] = [];

  @ViewChild('slides') slides: any;

  slideOptions: any;
  flashCardFlipped: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public quizService: QuizService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage', Math.random());
    this.questions = this.quizService.getQuestions();
    console.log("questions", this.questions)
  }

  selectAnswer() {
    this.flashCardFlipped = true;
  }

}
