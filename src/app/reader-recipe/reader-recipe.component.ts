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
  ingredientsLength:number;
  id:number;
  recordId:string;
  operation:string = "";
  operationType:string = "";
  recordString:Observable<string>;
  ingredients: Ingerdient[];
  instructions: Instruction[];
  public ingredientsRef: AngularFirestoreCollection<Ingerdient>;
  instructionsRef: AngularFirestoreCollection<Instruction>;
  ingredientsObservable: Observable<Ingerdient[]>;
  instructionsObservable: Observable<Instruction[]>;

  constructor(dbService:DataBaseService,  speech:SpeechService,  private route: ActivatedRoute, private afs: AngularFirestore) {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['id']) {
        this.id = params['id']
      }
    });
    this.dbService = dbService;
    this.speech = speech;
    this.index = -1;
    this.recordId="record_stop";
   }

   ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log("devorah"); 
      this.id = params['id'];
      this.getIngredientsByRecipeID(this.id);
      this.getInstructionsByRecipeID(this.id);
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
      this.ingredientsLength = this.ingredients.length;
      ingredients.forEach(ingredient => {
        console.log('product: ' + ingredient.product + ', amount: ' +
          ingredient.amount + ', unit: amount: ' + ingredient.unit);
       });
    });
  }


  getInstructionsByRecipeID(id) {
    console.log("getInstructionsByRecipeID: " + id);
    this.instructionsRef = this.afs.collection(`users/${this.dbService.user}/instructions`, ref => {
      return ref.where('recipeId', '==', +id);
    });
    this.instructionsObservable = this.instructionsRef.valueChanges();
    this.instructionsObservable.subscribe(instructions => {
      this.instructions = instructions;
      this.instructions.forEach(instruction => {
        console.log('description: ' + instruction.description);
      });
    });
  }

  record() {
    this.recordString =  this.recordIngredient(this.ingredients, this.index);
    this.recordString.subscribe(a=>{
      console.log(a);
    });
    if(this.recordId == "record_stop") {
      this.recordId="record_play"; 
    } else {
      this.recordId = "record_stop"
    }
   
  }

  readIngredient() {
    var myIngerdient = this.ingredients[this.index];
    let ingred_string = myIngerdient.amount + " " + myIngerdient.unit + " " + myIngerdient.product;
    this.operation = ingred_string;
    console.log("saying: " + ingred_string);
    var msg = new SpeechSynthesisUtterance(ingred_string);
    window.speechSynthesis.speak(msg);
  //  this.speech.sayIt(ingred_string);  
  }

  readInstruction() {
    var myInstruction = this.instructions[this.index - this.ingredientsLength];
    let instruction_string = myInstruction.description;
    this.operation = instruction_string;
    console.log("saying: " + instruction_string);
    var msg = new SpeechSynthesisUtterance(instruction_string);
    window.speechSynthesis.speak(msg);
  //  this.speech.sayIt(ingred_string);  
  }


  nextClick(){
    this.index ++;
    if(this.index >= this.ingredientsLength + this.instructions.length)
    {
      this.operationType = "Ingredients:"
      this.index = 0;
      this.readIngredient();
    }
    else if(this.index >= this.ingredientsLength) {
      this.operationType = "Instructions:"
      this.readInstruction()
    }
    else{
      this.operationType = "Ingredients:"
      this.readIngredient();
    }
  }

  prevClick(){
    if(this.index == 0)
    {
      this.index = this.ingredientsLength + this.instructions.length - 1;
    }
    else {
      this.index --;
    }
    if(this.index <= this.ingredientsLength - 1) {
      this.operationType = "Ingredients:"
      this.readIngredient()
    }
    else if(this.index >= this.ingredientsLength + this.instructions.length - 1)
    {
      this.operationType = "Instructions:"
      this.readInstruction();
    }
  }

  againClick(){
    if(this.index < this.ingredientsLength)
      this.readIngredient();
    else
      this.readInstruction();
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
