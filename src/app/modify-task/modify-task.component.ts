import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef,AfterViewInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import {Observable, observable,of as observableOf, BehaviorSubject} from "rxjs/index";
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import {TaskManagerServiceService} from '../task-manager-service.service';
import{Task} from '../task'
import { error } from '@angular/compiler/src/util';
//import {DataSource} from '@angular/cdk/collections';
import { merge } from 'rxjs/operators';
import {MatTableDataSource,MatSort,MatPaginator} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modify-task',
  templateUrl: './modify-task.component.html',
  styleUrls: ['./modify-task.component.css']
})
export class ModifyTaskComponent implements OnInit {
  isError:boolean=false;
  searchForm: FormGroup;
  Tasks:Task[];
  dataSource : MatTableDataSource<Task>;
  today:Date=new Date();
  @ViewChild('erDiv') errorDiv: ElementRef;

 displayedColumns: string[] = ['TaskName', 'ParentTaskName', 'Priority', 'StartDate','EndDate','customColumn1','customColumn2'];

 errorMsg:string;
 filterValues = {
  nameTask: '',
  pTask: '',
  PrioFrom: '',
  PrioTo: '',
  stDate:'',
  enDate:''
 }



  constructor(private ref: ChangeDetectorRef,private formBuilder: FormBuilder,private taskManagerService: TaskManagerServiceService,
    private router: Router) {
     
      this.GetAllTask();
     
   }

  ngOnInit() {
    
    
    this.searchForm=this.formBuilder.group({
      taskName:'',
      taskParentName:'',
      PriorityFrom:'',
      PriorityTo:'',
      startdate:'',
      enddate:''
    }

    );
    this.TrackValueChange();
    
    
  }
  TrackValueChange(){
    this.searchForm.get('taskName').valueChanges
  .subscribe(
    tname => {
      this.isError=false;
      this.filterValues.nameTask = tname;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  )
  this.searchForm.get('taskParentName').valueChanges
  .subscribe(
    ptname => {
      this.isError=false;
      this.filterValues.pTask = ptname;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  )
  this.searchForm.get('PriorityFrom').valueChanges
  .subscribe(
    pfrom => {
      this.isError=false;
      this.filterValues.PrioFrom = pfrom;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  )
  this.searchForm.get('PriorityTo').valueChanges
  .subscribe(
    pto => {
      this.isError=false;
      this.filterValues.PrioTo= pto;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  )
  this.searchForm.get('startdate').valueChanges
  .subscribe(
    sdate => {
      this.isError=false;
      this.filterValues.stDate = sdate;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  )
  this.searchForm.get('enddate').valueChanges
  .subscribe(
    edate => {
      this.isError=false;
      this.filterValues.enDate = edate;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  )
  
  }
  GetAllTask(){
    this.taskManagerService.GetAllTask().subscribe(data=>
      {
        this.Tasks=data;
        
        if(this.Tasks)
        {
       
         this.dataSource = new MatTableDataSource(this.Tasks);
         this.dataSource.filterPredicate = this.ApplyFilter();
         //this.ref.markForCheck();
        }
       
       
      },
      (error:any)=>{this.HandleError(error,"GetAllTask")}
      );
       
  }

  ApplyFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      //this.isError=false;
      
      let searchTerms = JSON.parse(filter);
      data.StartDate=new Date(data.StartDate);
      if(data.EndDate !=null && data.EndDate!=undefined)
      {
        data.EndDate=new Date(data.EndDate);
       }
     
       if ((data.TaskName.toLowerCase().indexOf(searchTerms.nameTask.toLowerCase()) !== -1) && ((searchTerms.pTask==="") ||
          (data.ParentTaskName!==null && data.ParentTaskName.toLowerCase().indexOf(searchTerms.pTask.toLowerCase()) !== -1))
          &&
          ((searchTerms.PrioFrom==="" || searchTerms.PrioFrom===null) || (data.Priority>=searchTerms.PrioFrom))
          &&
          ((searchTerms.PrioTo==="" || searchTerms.PrioTo===null) || (data.Priority<=searchTerms.PrioTo))
          &&
          ((searchTerms.stDate==="" || searchTerms.stDate===null) || (data.StartDate>=new Date(searchTerms.stDate)))
          &&
          ((searchTerms.enDate==="" || searchTerms.enDate===null) || (data.EndDate !==null && data.EndDate<=new Date(searchTerms.enDate)))
          
          )
          return true;
        else
          return false;

    
     
      
    }
    return filterFunction;
  }
  
  EndTask(t:Task)
  {
    this.isError=false;
    
    var previousEndDate=t.EndDate;
    var stDate=new Date(t.StartDate);
    if(stDate<this.today)
    {
      t.EndDate=new Date();
      this.taskManagerService.EditTask(t).subscribe(data=>{
     
      
       },
      (error:Error)=>{
        t.EndDate=previousEndDate;
        this.HandleError(error,"EndTask")
      });
    }
    else{
      this.isError=true;
      this.errorMsg="Task end date must be greater than start date ";

    }
  }
  EditTask(t:Task){
    this.router.navigate(['/AddTask', { Id: t.TaskId}]);

  }
  DisableButton(t:Task):boolean{
    if(t.EndDate !=null && t.EndDate!=undefined)
    {
        var edate=new Date(t.EndDate);
        //t.EndDate=new Date(t.EndDate);
        if(edate<=this.today)
        {
          return true;
        }
    }
    else{
      return false
    }
     

  }
  HandleError(err:any,orgOfError:string)
  {
    if((err.status===500|| err.status===0) && orgOfError==='GetAllTask')
    {
      this.isError=true;
      this.errorMsg="Tasks view loading failed. Please try again later.";

    }
    if(err.status===404 && orgOfError==='GetAllTask')
    {
      this.isError=true;
      this.errorMsg="No data avialable for viewing";

    }
    if((err.status===500|| err.status===0) && orgOfError==='EndTask')
    {
      this.isError=true;
      this.errorMsg="Task End update failed, please try again later";

    }
    if(err.status===400 && orgOfError==='EndTask')
    {
      this.isError=true;
      this.errorMsg="Task has child task/tasks which need to be end prior to parent task ";

    }
   

  }

}

