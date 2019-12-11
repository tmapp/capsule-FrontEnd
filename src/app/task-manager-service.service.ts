import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import { catchError, map, tap} from 'rxjs/operators';
import {Observable} from "rxjs/index";
import{Task} from './task';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerServiceService {
  TaskManagerApiUrl:string="http://localhost:8092/actuator";
  //TaskManagerApiUrl:string=environment.baseUrl;
  
  tasks:Task[];


  

  constructor(private http:HttpClient) { }
 
  GetAllTask():Observable<Task[]>{
    const params = new HttpParams()
    .set('isParentonly', 'false');
    
    return this.http.get<Task[]>(this.TaskManagerApiUrl,{params});
  }
  GetTask(id:string):Observable<Task>{
    const params = new HttpParams()
    .set('Id', id);
    
    return this.http.get<Task>(this.TaskManagerApiUrl,{params});
  }
      
     
      
  GetAllParentTask():Observable<Task[]>{
    const params = new HttpParams()
    .set('isParentonly', 'true');
    
    return this.http.get<Task[]>(this.TaskManagerApiUrl,{params});
  }
  Addtask(value:Task):Observable<any>{
    return this.http.post(this.TaskManagerApiUrl,value);

  }
  EditTask(value:Task):Observable<any>{
    return this.http.put(this.TaskManagerApiUrl,value);

  }

}
