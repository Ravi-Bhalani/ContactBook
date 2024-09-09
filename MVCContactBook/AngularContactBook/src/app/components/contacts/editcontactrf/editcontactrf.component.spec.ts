import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcontactrfComponent } from './editcontactrf.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

describe('EditcontactrfComponent', () => {
  let component: EditcontactrfComponent;
  let fixture: ComponentFixture<EditcontactrfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule,DatePipe],
      declarations: [EditcontactrfComponent],
      providers:[DatePipe]
    });
    fixture = TestBed.createComponent(EditcontactrfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
