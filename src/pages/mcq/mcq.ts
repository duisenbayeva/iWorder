import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QuizService} from "../../services/quiz.service";

@IonicPage()
@Component({
  selector: 'page-mcq',
  templateUrl: 'mcq.html',
})
export class McqPage {
  private questions:[]=[];
  private qId:number;
  private quizOver :boolean = false;
  private inProgress:boolean = false;
  private score:number = 0;
  private question: string;
  private options: [];
  private answer: number;
  private answerMode: boolean = false;
  private correctAns: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private quizService : QuizService) {
  }

  ionViewWillEnter() {
    this.questions = this.quizService.getQuestions();
    console.log("questions: ", this.questions);
  }

  start = function() {
    this.qId = 0;
    this.quizOver = false;
    this.inProgress = true;
    this.getQuestion();
  };

  getQuestion(){
    console.log("questions = ", this.questions);
    if(this.qId < this.questions.length) {
      this.question =  this.questions[this.qId].question;
      this.options =  this.questions[this.qId].options;
      this.answer =  this.questions[this.qId].answer;
      this.answerMode = true;
      console.log(" Question=",this.question)
    } else {
    this.quizOver = true;
    }
  }

  checkAnswer(){

  }

  reset(){
    this.inProgress = false;
    this.score = 0;
  }

  nextQuestion = function() {
    this.id++;
    this.getQuestion();
  }

}
