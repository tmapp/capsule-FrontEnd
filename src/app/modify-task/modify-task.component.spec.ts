import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatTableModule,MatSortModule,MatPaginatorModule,MatButtonModule, MatSelectModule, MatIconModule,MatDatepickerModule,MatNativeDateModule } from '@angular/material';

import { ModifyTaskComponent } from './modify-task.component';

describe('ModifyTaskComponent', () => {
  let component: ModifyTaskComponent;
  let fixture: ComponentFixture<ModifyTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,ReactiveFormsModule,HttpClientModule,RouterModule,RouterTestingModule,MatTableModule,MatInputModule, MatDatepickerModule,MatNativeDateModule],
      declarations: [ ModifyTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
