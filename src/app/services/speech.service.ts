import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { DataBaseService, Ingerdient } from '../services/data-base.service';
import * as _ from "lodash";

interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
   // SpeechSynthesisUtterance: any;
    //SpeechSynthesis: any;
}

//todo call data base service with new db.
export interface speechComand{
    name: string,
    value: string
   }

export interface speechSettings{
    voice : string;
    lang : string;
    rate : string;
    volume : string;
    pitch : string;
}


@Injectable()
export class SpeechService {
    speechRecognition: any;
    db: AngularFireDatabase;
    voice : string;
    lang : string;
    rate : string;
    volume : string;
    pitch : string;
    sayList: any[];
    sayWord : string;
    index: number;
    ingredients: Ingerdient[];


    constructor(private zone: NgZone,  db:AngularFireDatabase) {
        this.db = db;
        this.getSettingFromDB();
    };


    recordIngredient(ingredients, index):Observable<string> 
    {
        this.index = index;
        this.ingredients = ingredients;
        return this.record();
    }

    record(): Observable<string> {

        return Observable.create(observer => {
            const { webkitSpeechRecognition }: IWindow = <IWindow>window;
            this.speechRecognition = new webkitSpeechRecognition();
            this.speechRecognition.continuous = true;
            //this.speechRecognition.interimResults = true;
            this.speechRecognition.lang = 'en-us';
            this.speechRecognition.maxAlternatives = 1;

            this.speechRecognition.onresult = speech => {
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
                                this.nextClick();
                            }                           
                            if(term == "back" || term == "prev")
                            {
                                this.prevClick();
                            }
                            if(term == "repeat" || term == "again")
                            {
                                this.againClick();
                            }
                        }
                    }
                }
           /*     this.zone.run(() => {
                    observer.next(term);
                });*/
            };

            this.speechRecognition.onerror = error => {
                observer.error(error);
            };

            this.speechRecognition.onend = () => {
                observer.complete();
            };

            this.speechRecognition.start();
            console.log("Say something - We are listening !!!");
        });
    }

    DestroySpeechObject() {
        if (this.speechRecognition)
            this.speechRecognition.stop();
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

      reader() {
        var myIngerdient = this.ingredients[this.index];
        let ingred_string = myIngerdient.amount + " " + myIngerdient.unit + " " + myIngerdient.product;
        this.sayIt(ingred_string);
      }
    

    callDB(): void {

        console.log("in myTest1")

        this.db.list('/DevorahTest').valueChanges().subscribe(recipes => {
            this.sayList = [];
            recipes.forEach(say => {
                this.sayWord = JSON.stringify(say)
            this.sayList.push(JSON.stringify(this.sayIt));
            this.sayIt(this.sayWord);
            })
        });
    }

    sayIt(input:string) {
        //this.getSettingFromDB();
        if ('speechSynthesis' in window) {
          console.log('Your browser supports speech synthesis.');
        // speak('hi');
        } else {
            alert('Sorry your browser does not support speech synthesis. Try this in <a href="https://www.google.com/chrome/browser/desktop/index.html">Google Chrome</a>.');
        }
        // const {SpeechSynthesisUtterance}: IWindow = <IWindow>window;
        // const {SpeechSynthesis}: IWindow = <IWindow>window;

        // Create a new instance of SpeechSynthesisUtterance.
       
        var msg = new SpeechSynthesisUtterance();
        // Set the text.
        msg.text = input;

        // Set the attributes.
        msg.lang = this.lang;
        var voices = window.speechSynthesis.getVoices();
        for(var i = 0; i < voices.length; i++) {
            //console.log(voices[i].name);
            if(voices[i].name === this.voice) {
                msg.voice = voices[i];
            }
        }
        // msg.voice = this.voice;// 'native'; msg.voice = 'Google US English'; //  'Google UK English Female'
        // msg.voice = 'native';
            msg.volume = +this.volume;
            msg.rate = +this.rate;
            msg.pitch = +this.pitch;

        //  msg.onend = function(event) { console.log('Speech complete'); }
        // Queue this utterance.
            //this.speechSynthesis = new SpeechSynthesis();
            //this.speechSynthesis.speak(msg);
        //(<any>window).speechSynthesis.speak(msg);
        window.speechSynthesis.speak(msg);

        // var msg2 = new SpeechSynthesisUtterance("hello world");
        // (<any>window).speechSynthesis.speak(msg2)
  }

  getSettingFromDB() : speechSettings {



    this.db.object('firstUser/settings/voiceSettings/voice').valueChanges().subscribe(x => {
        this.voice = <string>x;
        console.log("xxx"  + this.voice)
        }
    );

    this.db.object('firstUser/settings/voiceSettings/volume').valueChanges().subscribe(x => {
        this.volume = <string>x;
        }
    );

    this.db.object('firstUser/settings/voiceSettings/rate').valueChanges().subscribe(x => {
        this.rate = <string>x;
        }
    );

    this.db.object('firstUser/settings/voiceSettings/pitch').valueChanges().subscribe(x => {
        this.pitch = <string>x;
        }
    );

    return {
        voice: this.voice,
        lang: this.lang,
        rate: this.rate,
        volume: this.volume,
        pitch: this.pitch,

    }
}
}


