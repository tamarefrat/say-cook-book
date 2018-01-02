import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceSettingComponent } from './voice-setting.component';

describe('VoiceSettingComponent', () => {
  let component: VoiceSettingComponent;
  let fixture: ComponentFixture<VoiceSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoiceSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
