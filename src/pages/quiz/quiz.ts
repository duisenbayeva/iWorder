import {Component, ViewChild} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {QuizService} from "../../services/quiz.service";

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  @ViewChild('slides') slides: any;

  private questions: any[] = [];
  private slideOptions: any;
  private flashCardFlipped: boolean = false;
  private hasAnswered: boolean = false;
  private score: number = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public quizService: QuizService) {
  }

  ionViewDidLoad() {

    this.slides.lockSwipes(true);

    console.log('ionViewDidLoad QuizPage');

    this.questions = this.quizService.getQuestions2(this.navParams.get('wordList'), 3)
      .map((question) => {

        let originalOrder = question.answers;
        question.answers = this.randomizeAnswers(originalOrder);
        return question;

      });
    console.log("questions", this.questions)
  }

  ionViewWillEnter() {
    console.log("will enter", this.navParams.get('catalogName'), this.navParams.get('wordList'))
  }

  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  selectAnswer(answer, question) {

    this.hasAnswered = true;
    answer.selected = true;
    question.flashCardFlipped = true;

    if (answer.correct) {
      this.score++;
    }

    setTimeout(() => {
      this.hasAnswered = false;
      this.nextSlide();
      answer.selected = false;
      question.flashCardFlipped = false;
    }, 3000);
  }


  randomizeAnswers(rawAnswers: any[]): any[] {

    for (let i = rawAnswers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = rawAnswers[i];
      rawAnswers[i] = rawAnswers[j];
      rawAnswers[j] = temp;
    }

    return rawAnswers;

  }

  restartQuiz() {
    this.score = 0;
    this.slides.lockSwipes(false);
    this.slides.slideTo(1, 1000);
    this.slides.lockSwipes(true);
  }

}
