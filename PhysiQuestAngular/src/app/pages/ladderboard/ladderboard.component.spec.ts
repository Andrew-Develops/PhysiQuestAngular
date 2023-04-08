import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadderboardComponent } from './ladderboard.component';

describe('LadderboardComponent', () => {
  let component: LadderboardComponent;
  let fixture: ComponentFixture<LadderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LadderboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LadderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
