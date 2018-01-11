import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { SpeechService, speechSettings } from '../services/speech.service';

@Component({
  selector: 'app-voice-setting',
  templateUrl: './voice-setting.component.html',
  styleUrls: ['./voice-setting.component.scss']
})
export class VoiceSettingComponent implements OnInit {

  db: AngularFireDatabase;
  speechService: SpeechService;
  voiceSelectedValue: string;
  volumeSelectedValue: number;
  pitchSelectedValue: number;
  rateSelectedValue: number;

  speechSettings: speechSettings;

  settings$ :any // FirebaseListObservable<any>

  languages = [
    {key: "Google US English", value: "US English"},
    {key: "Google UK English Female", value: "UK English Female"},
    {key: "Google UK English Male", value: "UK English Male"}
  ];

  constructor(db:AngularFireDatabase, speechService: SpeechService) {
    this.db = db;
    //this.speechService = speechService;
    this.speechSettings = speechService.getSettingFromDB();
    console.log(this.speechSettings.voice + "testtttttt  " + this.speechSettings.volume);
     this.voiceSelectedValue = this.speechSettings.voice;
    this.volumeSelectedValue = +this.speechSettings.volume;
    this.rateSelectedValue = +this.speechSettings.rate;
    this.pitchSelectedValue = +this.speechSettings.pitch;
  }

  ngOnInit() {

  }

  writeToDB()
  {
    var path = 'firstUser/settings/voiceSettings';

    this.settings$ = this.db.object(path);
    if(this.voiceSelectedValue != null)
        this.settings$.update({voice: this.voiceSelectedValue});
    if(this.rateSelectedValue != null)
        this.settings$.update({rate: this.rateSelectedValue});
    if(this.pitchSelectedValue != null)
        this.settings$.update({pitch: this.pitchSelectedValue});
    if(this.volumeSelectedValue != null)
        this.settings$.update({volume: this.volumeSelectedValue});


  }

}
