import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineLegendComponent } from './timeline-legend.component';

describe('TimelineLegendComponent', () => {
  let component: TimelineLegendComponent;
  let fixture: ComponentFixture<TimelineLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
