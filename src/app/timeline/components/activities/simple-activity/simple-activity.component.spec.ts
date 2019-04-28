import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleActivityComponent } from './simple-activity.component';

describe('SimpleActivityComponent', () => {
  let component: SimpleActivityComponent;
  let fixture: ComponentFixture<SimpleActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
