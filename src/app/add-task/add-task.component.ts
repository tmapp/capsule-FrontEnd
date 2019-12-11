import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Observable} from "rxjs/index";
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import {TaskManagerServiceService} from '../task-manager-service.service';
import{Task} from '../task'
import { error } from '@angular/compiler/src/util';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

   editTaskID:string;
   isEditMode:boolean=false;
   startEndDate:Date=new Date();
   ParentTasks:Task[];
   //model:Task=new Task();
   model:Task;
   isError:boolean=false;
   isValidationStDateError:boolean=false;
   isValidationEndDateError:boolean=false;
   isValidationSteDateError:boolean=false;
   errorMsg:string;
   isSuccess:boolean=false;
   successMsg:string;
   pTaskStartDate:Date;
   pTaskEnddate:Date;
   constructor(private taskManagerService: TaskManagerServiceService,private route: ActivatedRoute,private router: Router) {
    this.startEndDate.setDate( this.startEndDate.getDate() + 1);
    
   }

  ngOnInit() {
    this.GetAllParentTask();
    this.route.params.subscribe((data) => {
     
      this.editTaskID = data.Id;
      if(this.editTaskID!==undefined && this.editTaskID!==null)
      {
       this.isEditMode=true;
       this.GetTaskById()
      }
      else{
        this.isEditMode=false;
        this.model=new Task();
      }
      //this.changeDetector.detectChanges();
     } );
    //this.editTaskID = this.route.snapshot.params.Id;
    
    
    
    
  }
  onSubmit(){
     this.isError=false;
     this.isValidationStDateError=false;
     this.isValidationEndDateError=false;
     this.isValidationSteDateError=false
     this.isSuccess=false;

      let allowSubmit=true;
      
      
      if (this.model.ParentTaskId !=null && this.model.ParentTaskId !=undefined)
      {
        this.model.ParentTaskId=Number(this.model.ParentTaskId);
         var pTask=this.ParentTasks.filter(item=>item.TaskId===this.model.ParentTaskId);
         var compareResult=this.ComapareAgainstParenttask(pTask[0]);
         allowSubmit=compareResult;
      }
      if(allowSubmit)
      {
        if(this.editTaskID!==undefined && this.editTaskID!==null)
        {
          this.EditTask();
        }
        else{
           this.AddTask();
        }
        
      }
  

  }
  ResetForm(form: NgForm)
  {
     this.isError=false;
     this.isValidationStDateError=false;
     this.isValidationEndDateError=false;
     this.isValidationSteDateError=false
     this.isSuccess=false;
      form.reset();
    
  }
  CancelEdit()
  {
    this.router.navigate(['/ViewTask']);
  }
  ComapareAgainstParenttask(task:Task):boolean{
    let rtValue=true;
    
    
    task.StartDate=new Date(task.StartDate);
    if(task.EndDate !=null && task.EndDate!=undefined)
    {
        task.EndDate=new Date(task.EndDate);
    }
    if (task.StartDate>this.model.StartDate)
    {
      rtValue=false;
      this.isValidationStDateError=true;
      this.pTaskStartDate=task.StartDate;

    }
    else if(task.EndDate!=null && task.EndDate <this.model.StartDate)
    {
      rtValue=false;
      this.isValidationSteDateError=true;
      this.pTaskStartDate=task.EndDate;

    }
    if (task.EndDate!=null && (this.model.EndDate===null || this.model.EndDate===undefined))
    {
      rtValue=false;
      this.isValidationEndDateError=true;
      this.pTaskEnddate=task.EndDate;

    }
    return rtValue;
  }
  GetAllParentTask(){
    this.taskManagerService.GetAllParentTask().subscribe(data=>
      {
        this.ParentTasks=data;
        var pTask=this.ParentTasks.filter(item=>item.TaskId==null);
        if(pTask ==null || pTask.length==0)
        {
           var ts=new Task();
           ts.TaskId =null;
           ts.TaskName ="Choose Parent Task";
           this.ParentTasks.push(ts);
        }
       
      },
      (error:any)=>{this.HandleError(error,"GetAllParentTask")}
      );
       
  }
  GetTaskById(){
    this.taskManagerService.GetTask(this.editTaskID).subscribe(data=>
      {
        this.model=data;
               
      },
      (error:any)=>{this.HandleError(error,"GetTaskById")}
      );
       
  }
  AddTask()
  {
    this.taskManagerService.Addtask(this.model).subscribe(data=>{
      this.isSuccess=true;
      this.successMsg="Task has been added successfully";
      this.GetAllParentTask();
    },
      (error:Error)=>this.HandleError(error,"AddTask"));
  }
  EditTask()
  {
    this.taskManagerService.EditTask(this.model).subscribe(data=>{
      this.isSuccess=true;
      this.successMsg="Task has been updated successfully";
      
    },
      (error:Error)=>this.HandleError(error,"EditTask"));
  }
  HandleError(err:any,orgOfError:string)
  {
    if((err.status===500|| err.status===0) && (orgOfError==='GetAllParentTask' || orgOfError==='GetTaskById'))
    {
      this.isError=true;
      orgOfError==='GetAllParentTask'?this.errorMsg="Pernt task loading failed":this.errorMsg="Task retrieve failed";

    }
    if((err.status===500|| err.status===0) && (orgOfError==='AddTask'|| orgOfError==='EditTask'))
    {
      this.isError=true;
      orgOfError==='AddTask'?this.errorMsg="Task addition failed, please try again later":this.errorMsg="Update failed, please try again later";

    }
    if(err.status===400 && (orgOfError==='AddTask'|| orgOfError==='EditTask'))
    {
      this.isError=true;
      if(orgOfError==='AddTask'){
        this.errorMsg="Active task with same "+ this.model.TaskName +" name is already present in the system";
      }
      else{
        if(err.error.ModelState.TaskName!==undefined){
          this.errorMsg=err.error.ModelState.TaskName[0];
        }
        else{
        this.errorMsg="Task update request rejected due to one or more validation failed";
        }
      }

    }
   

  }

}
