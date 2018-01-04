import { Component, OnInit } from '@angular/core';
import { DataBaseService, Ingerdient } from '../services/data-base.service';
import { SpeechService } from '../services/speech.service';

@Component({
  selector: 'app-reader-recipe',
  templateUrl: './reader-recipe.component.html',
  styleUrls: ['./reader-recipe.component.css']
})
export class ReaderRecipeComponent implements OnInit {
  dbService:DataBaseService;
  speech:SpeechService;
  myIngerdient:Ingerdient;
  index:number;
  
  constructor(dbService:DataBaseService,speech:SpeechService) {
    this.dbService = dbService;
    this.speech = speech;
    this.index=0;
   }

  ngOnInit() {
  }

  reader() {
    this.myIngerdient = this.dbService.ingredientsList[this.index];
    console.log(this.myIngerdient);
    alert(this.myIngerdient.product);
    this.speech.sayIt(this.myIngerdient.product);
    /*
      this.speech.sayIt(a.amount.toString());
      this.speech.sayIt(a.unit);
      this.speech.sayIt(a.product);
    */
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
