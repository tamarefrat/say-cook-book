import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import * as _ from "lodash";

interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
    SpeechSynthesisUtterance: any;
    SpeechSynthesis: any;
}

@Injectable()
export class SpeechService {
    speechRecognition: any;
    speechSynthesis: any;
    db: AngularFireDatabase;
    voice : string;
    lang : string;
    rate : string;
    volume : string;

    sayList: any[];
    sayWord : String;


   /* constructor(private zone: NgZone,  db:AngularFireDatabase) {
        this.db = db;
        this.db.list('/Setting').valueChanges().subscribe(setting => {
            setting.forEach( oneSetting => {
            switch ( oneSetting.name)
            {
                case "voice":
                this.voice = oneSetting.value;
                break;
                case "lang":
                this.lang = oneSetting.value;
                break;
            }
            })
        });
    }
*/
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
                        }
                    }
                }
                this.zone.run(() => {
                    observer.next(term);
                });
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

    callDB(): void {
        console.log("in myTest");

        this.db.list('/DevorahTest').valueChanges().subscribe(recipes => {
            this.sayList = [];
            recipes.forEach(say => {
                this.sayWord = JSON.stringify(say)
            this.sayList.push(JSON.stringify(this.sayIt));
            this.sayIt(this.sayWord);
            })
        });
    }

    sayIt(input:String) {
      if ('speechSynthesis' in window) {
          console.log('Your browser supports speech synthesis.');
      // speak('hi');
      } else {
          alert('Sorry your browser does not support speech synthesis. Try this in <a href="https://www.google.com/chrome/browser/desktop/index.html">Google Chrome</a>.');
      }
      const {SpeechSynthesisUtterance}: IWindow = <IWindow>window;
      const {SpeechSynthesis}: IWindow = <IWindow>window;

     // Create a new instance of SpeechSynthesisUtterance.
      var msg = new SpeechSynthesisUtterance();
      // Set the text.
      msg.text = input;

     // Set the attributes.
      msg.lang = this.lang;
      var voices = (<any>window).speechSynthesis.getVoices();
      for(var i = 0; i < voices.length; i++) {
        console.log(voices[i].name);
        if(voices[i].name === this.voice) {
          msg.voice = voices[i];
        }
      }
      // msg.voice = this.voice;// 'native'; msg.voice = 'Google US English'; //  'Google UK English Female'
     // msg.voice = 'native';
      msg.volume = 1;
      msg.rate = 1;
      msg.pitch = 1;
     //  msg.onend = function(event) { console.log('Speech complete'); }
      // Queue this utterance.
    //  var talk = new SpeechSynthesis();
      (<any>window).speechSynthesis.speak(msg);
  }
}


