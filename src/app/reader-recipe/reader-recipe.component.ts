import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DataBaseService, Ingerdient } from '../services/data-base.service';
import { SpeechService } from '../services/speech.service';

@Component({
  selector: 'app-reader-recipe',
  templateUrl: './reader-recipe.component.html',
  styleUrls: ['./reader-recipe.component.scss']
})
export class ReaderRecipeComponent implements OnInit {
  dbService:DataBaseService;
  speech:SpeechService;
  myIngerdient:Ingerdient;
  index:number;
  operation:string;
  recordString:Observable<string>;

  constructor(dbService:DataBaseService,speech:SpeechService) {
    this.dbService = dbService;
    this.speech = speech;
    this.index=0;
   }

  ngOnInit() {
  }

  record() {
    this.recordString = this.speech.record();
    this.recordString.subscribe(a=>{
      console.log(a);
    });
  }

  reader() {
    console.log(this.dbService.getIngredientsByRecipeID(88));
    this.myIngerdient = this.dbService.ingredientsList[this.index];
    console.log(this.myIngerdient);
    let ingred_string = this.myIngerdient.amount + " " + this.myIngerdient.unit + " " + this.myIngerdient.product;
    this.operation = ingred_string;
    this.speech.sayIt(ingred_string);
  }
  nextClick(){
    console.log('hi read next');


    this.index++;
    if(this.index >= this.dbService.ingredientsList.length) {
      this.index = 0;
    }
    this.reader();
  }
  prevClick(){
    console.log('hi read prev');
    this.index--;
    if(this.index < 0) {
      this.index = this.dbService.ingredientsList.length-1;
    }
    this.reader();
  }
  againClick(){
    console.log('hi read again');
    this.reader();
  }

}
