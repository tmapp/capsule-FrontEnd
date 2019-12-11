import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse,HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TaskManagerServiceService } from './task-manager-service.service';
import {Observable} from "rxjs/index";
import{Task} from './task';

describe('TaskManagerServiceService', () => {
  let httpTestingController: HttpTestingController;
  beforeEach(() =>{ TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers:[TaskManagerServiceService]
  })
  httpTestingController = TestBed.get(HttpTestingController);
});

  it('should be created', () => {
    const service: TaskManagerServiceService = TestBed.get(TaskManagerServiceService);
    expect(service).toBeTruthy();
  });
});
