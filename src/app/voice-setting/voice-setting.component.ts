import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voice-setting',
  templateUrl: './voice-setting.component.html',
  styleUrls: ['./voice-setting.component.css']
})
export class VoiceSettingComponent implements OnInit {
  voiceSelectedValue: string;
  volumeSelectedValue: string;
  pitchSelectedValue: string;
  rateSelectedValue: string;

  languages = [
    {key: "Google US English", value: "US English"},
    {key: "Google UK English Female", value: "UK English Female"},
    {key: "Google UK English Male", value: "UK English Male"}
  ];
  
  constructor() { }

  ngOnInit() {
  console.log('hi shira');
  }

}
