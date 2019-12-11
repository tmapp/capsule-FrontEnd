import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddTaskComponent} from './add-task/add-task.component';
import {ViewTaskComponent} from './view-task/view-task.component';
import {ModifyTaskComponent} from './modify-task/modify-task.component';



const routes: Routes = [
  { path: 'AddTask', component: AddTaskComponent },
  {path: 'AddTask/:Id', component: AddTaskComponent},
  { path: 'ViewTask',    component: ViewTaskComponent },
  { path: 'ModifyTask',    component: ModifyTaskComponent },
  { path: '',   redirectTo: '/AddTask', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
