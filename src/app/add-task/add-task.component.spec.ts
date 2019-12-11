import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import {Observable} from "rxjs/index";
import { AddTaskComponent } from './add-task.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import{Task} from '../task';
import { of } from 'rxjs';
import {TaskManagerServiceService} from '../task-manager-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatTableModule,MatSortModule,MatPaginatorModule,MatButtonModule, MatSelectModule, MatIconModule,MatDatepickerModule,MatNativeDateModule } from '@angular/material';
class MockTaskService {       
  public tasks: Task[];
  public GetAllParentTask():Observable<Task[]> {
      this.tasks = [{ TaskId: 100, TaskName: "test1", Priority: 10,StartDate:new Date(),EndDate:new Date(),ParentTaskId:2,ParentTaskName:"Test2" },
      { TaskId: 3, TaskName: "test2", Priority: 10,StartDate:new Date(),EndDate:new Date(),ParentTaskId:2,ParentTaskName:"Test3" }
    ];
      return of(this.tasks);

  }
  public Addtask(task:Task):Observable<any>{
    let res:any="result";
    return of(res);
  }
  public EditTask(task:Task):Observable<any>{
    let res:any="result";
    return of(res);
  }
}

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let taskMangerervice: MockTaskService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,ReactiveFormsModule,HttpClientModule,RouterModule,RouterTestingModule,MatInputModule, MatDatepickerModule,MatNativeDateModule],
      declarations: [ AddTaskComponent ],
      providers: [
        //ItemService
        { provide: TaskManagerServiceService, useClass: MockTaskService }
    ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    taskMangerervice = fixture.debugElement.injector.get(TaskManagerServiceService); 
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Edit mode should be false', () => {
    
    expect(component.isEditMode).toBeFalsy();
  });
  it('Edit mode should be false', () => {
    
    expect(component.isError).toBeFalsy();
  });
  it('should not show task name validation error until form control element touched', () => {
    let TaskNamevalidationerror: DebugElement;
    fixture.detectChanges(); // run change detection

    // try to get a handle to the validation message (should exist as form is invalid):
    TaskNamevalidationerror = fixture.debugElement.query(By.css('.alert alert-danger'));

    // the validation error should be found:
    expect(TaskNamevalidationerror).toBeFalsy();
  });
  it('should get parent task items', () => {
    component.ngOnInit();
    
    expect(component.ParentTasks[0].TaskId).toEqual(100);
}); 
it('On submit add task successfully call', () => {
  let t:Task=new Task();
  t.TaskName="TName";
  t.StartDate=new Date();
  t.Priority=19;
  component.model=t;
  component.onSubmit();
  
  expect(component.isSuccess).toBeTruthy();
});
it('CompareAgainstParentTask method parent task start date validation failed', () => {
  let t:Task=new Task();
  t.TaskName="TName";
  t.StartDate=new Date("2019-01-20");
  t.Priority=19;
  t.ParentTaskId=3;
  component.model=t;
  let tfortest:Task=new Task();
  tfortest.TaskName="TName";
  tfortest.StartDate=new Date();
  tfortest.Priority=19;
  
  
  expect(component.ComapareAgainstParenttask(tfortest)).toBeFalsy();
});
it('on Edit mode - On submit Edit task successfully call', () => {
  let t:Task=new Task();
  t.TaskName="TName";
  t.StartDate=new Date();
  t.Priority=19;
  component.model=t;
  component.editTaskID="3";
  component.onSubmit();
  
  expect(component.successMsg).toEqual("Task has been updated successfully");
}); 


  
});
