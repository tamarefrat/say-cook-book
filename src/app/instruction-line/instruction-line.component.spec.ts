import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionLineComponent } from './instruction-line.component';

describe('InstructionLineComponent', () => {
  let component: InstructionLineComponent;
  let fixture: ComponentFixture<InstructionLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
