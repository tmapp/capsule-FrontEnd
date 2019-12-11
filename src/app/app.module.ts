import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatTableModule,MatSortModule,MatPaginatorModule,MatButtonModule, MatSelectModule, MatIconModule,MatDatepickerModule,MatNativeDateModule } from '@angular/material';
import {TaskManagerServiceService} from './task-manager-service.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { ModifyTaskComponent } from './modify-task/modify-task.component';
import { MenuComponent } from './menu/menu.component';
import { StartEndDateComparisonDirective } from './CustomValidator/required-start-date.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    ModifyTaskComponent,
    MenuComponent,
    StartEndDateComparisonDirective,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
   
  ],
  providers: [TaskManagerServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
