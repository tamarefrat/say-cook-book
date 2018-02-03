import { Component, OnInit, OnDestroy} from '@angular/core';
import { SpeechService } from '../services/speech.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'speech-app',
    templateUrl: './speech.component.html'
})

export class SpeechComponent implements OnInit , OnDestroy {
    showSearchButton: boolean;
    speechData: string;
    db: AngularFireDatabase;
    rec: Observable<any[]>;
    sayList: any[];
    sayIt : string;

    constructor(private speechRecognitionService: SpeechService , db:AngularFireDatabase) {
        this.showSearchButton = true;
        this.speechData = "";
        this.db = db;
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.speechRecognitionService.DestroySpeechObject();
    }

    activateSpeechSearchMovie(): void {
        this.showSearchButton = false;

        this.speechRecognitionService.record()
            .subscribe(
            //listener
            (value) => {
                this.speechData = value;
                console.log(value);
            },
            //errror
            (err) => {
                console.log(err);
                if (err.error == "no-speech") {
                    console.log("--restatring service--");
                    this.activateSpeechSearchMovie();
                }
            },
            //completion
            () => {
                this.showSearchButton = true;
                console.log("--complete--");
                this.activateSpeechSearchMovie();
            });
    }

     myTest(): void {
        console.log("in myTest");
    
        this.db.list('/DevorahTest').valueChanges().subscribe(recipes => {
            this.sayList = [];   
            recipes.forEach(say => {
                this.sayIt = JSON.stringify(say)
            this.sayList.push(JSON.stringify(this.sayIt));
            this.speechRecognitionService.sayIt(this.sayIt);
            })
        });
    }
}
