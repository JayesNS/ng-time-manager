import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoActivityComponent } from './todo-activity.component';

describe('TodoActivityComponent', () => {
  let component: TodoActivityComponent;
  let fixture: ComponentFixture<TodoActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
