import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DataBaseService, Ingerdient, Instruction } from '../services/data-base.service';
import { SpeechService } from '../services/speech.service';
import { ActivatedRoute, Params} from "@angular/router";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as _ from "lodash";
import { trigger, style, animate, transition } from '@angular/animations';

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
  id:number;
  operation:string = "Ingredients";
  recordString:Observable<string>;
  ingredients: Ingerdient[];
  instructions: Instruction[];
  public ingredientsRef: AngularFirestoreCollection<Ingerdient>;
  ingredientsObservable: Observable<Ingerdient[]>;

  constructor(dbService:DataBaseService,  speech:SpeechService,  private route: ActivatedRoute, private afs: AngularFirestore) {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['id']) {
        this.id = params['id']
      }
    });
    this.dbService = dbService;
    this.speech = speech;
    this.index=0;
   }

   ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log("devorah"); 
      this.id = params['id'];
      this.getIngredientsByRecipeID(this.id);
      this.instructions = this.dbService.getInstructionsByRecipeID(this.id);


      // this will be called every time route changes
      // so you can perform your functionality here

    });
  }

  getIngredientsByRecipeID(id) {
    console.log("test idddddddd: " + id);
    this.ingredientsRef = this.afs.collection(`users/${this.dbService.user}/ingredients`, ref => {
      return ref.where('recipeId', '==', +id);
    });
    this.ingredientsObservable = this.ingredientsRef.valueChanges();
    this.ingredientsObservable.subscribe(ingredients => {
      this.ingredients = ingredients;
      ingredients.forEach(ingredient => {
        console.log('product: ' + ingredient.product + ', amount: ' +
          ingredient.amount + ', unit: amount: ' + ingredient.unit);
       });
    });
  }

  record() {
    this.recordString =  this.recordIngredient(this.ingredients, this.index);
    this.recordString.subscribe(a=>{
      console.log(a);
    });
  }

  reader() {
    var myIngerdient = this.ingredients[this.index];
    let ingred_string = myIngerdient.amount + " " + myIngerdient.unit + " " + myIngerdient.product;
    this.operation = ingred_string;
    console.log("saying: " + ingred_string);
    var msg = new SpeechSynthesisUtterance(ingred_string);
    window.speechSynthesis.speak(msg);
  //  this.speech.sayIt(ingred_string);  
  }


  nextClick(){
    console.log('hi read next');
    this.index++;
    if(this.index >= this.ingredients.length) {
      this.index = 0;
    }
    this.reader();
  }

  prevClick(){
    console.log('hi read prev');
    this.index--;
    if(this.index < 0) {
      this.index = this.ingredients .length-1;
    }
    this.reader();
  }

  againClick(){
    console.log('hi read again');
    this.reader();
  }

  recordIngredient(ingredients, index):Observable<string> 
  {
      this.index = index;
      this.ingredients = ingredients;
      return this.record1();
  }

  record1(): Observable<string> {

      return Observable.create(observer => {
          const { webkitSpeechRecognition }: any = window;
          var speechRecognition = new webkitSpeechRecognition();
          speechRecognition.continuous = true;
          //this.speechRecognition.interimResults = true;
          speechRecognition.lang = 'en-us';
          speechRecognition.maxAlternatives = 1;

          speechRecognition.onresult = speech => {
              let term: string = "";
              if (speech.results) {
                  var result = speech.results[speech.resultIndex];
                  var transcript = result[0].transcript;
                  if (result.isFinal) {
                      if (result[0].confidence < 0.3) {
                          console.log("Unrecognized result - Please try again");
                      }
                      else {
                          term = _.trim(transcript);
                          console.log("Did you said? -> " + term + " , If not then say something else...");
                          if(term == "next")
                          {
                              console.log("nextnextnextnextnextnext");
                              this.nextClick();
                          }                           
                          if(term == "back")
                          {
                              console.log("backbackbackbackbackback");
                              this.prevClick();
                          }
                          if(term == "repeat")
                          {
                              console.log("repeatrepeatrepeatrepeat");
                              this.againClick();
                          }
                      }
                  }
              }
         /*     this.zone.run(() => {
                  observer.next(term);
              });*/
          };

          speechRecognition.onerror = error => {
              observer.error(error);
          };

          speechRecognition.onend = () => {
              observer.complete();
          };

          speechRecognition.start();
          console.log("Say something - We are listening !!!");
      });
  }


  


}
