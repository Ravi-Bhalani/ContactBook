import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcontactbybirthdatemonthComponent } from './getcontactbybirthdatemonth.component';

describe('GetcontactbybirthdatemonthComponent', () => {
  let component: GetcontactbybirthdatemonthComponent;
  let fixture: ComponentFixture<GetcontactbybirthdatemonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetcontactbybirthdatemonthComponent]
    });
    fixture = TestBed.createComponent(GetcontactbybirthdatemonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
