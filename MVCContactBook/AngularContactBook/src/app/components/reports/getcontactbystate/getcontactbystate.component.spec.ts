import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcontactbystateComponent } from './getcontactbystate.component';

describe('GetcontactbystateComponent', () => {
  let component: GetcontactbystateComponent;
  let fixture: ComponentFixture<GetcontactbystateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetcontactbystateComponent]
    });
    fixture = TestBed.createComponent(GetcontactbystateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
