import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFeedComponent } from './task-feed.component';

describe('TaskFeedComponent', () => {
  let component: TaskFeedComponent;
  let fixture: ComponentFixture<TaskFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
