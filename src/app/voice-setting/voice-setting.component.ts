import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from "angularfire2/database-deprecated"; 

@Component({
  selector: 'app-voice-setting',
  templateUrl: './voice-setting.component.html',
  styleUrls: ['./voice-setting.component.css']
})
export class VoiceSettingComponent implements OnInit {

  db: AngularFireDatabase;
  voiceSelectedValue: string;
  volumeSelectedValue: number;
  pitchSelectedValue: number;
  rateSelectedValue: number;

  settings$ :any // FirebaseListObservable<any>

  languages = [
    {key: "Google US English", value: "US English"},
    {key: "Google UK English Female", value: "UK English Female"},
    {key: "Google UK English Male", value: "UK English Male"}
  ];
  
  constructor(db:AngularFireDatabase) { 
    this.db = db;
    this.voiceSelectedValue = null;
    this.volumeSelectedValue = null;
    this.rateSelectedValue = null;
    this.pitchSelectedValue = null;
  }

  ngOnInit() {

  }

  writeToDB()
  {
    var path = 'firstUser/settings/voiceSettings';
    console.log(path);

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
