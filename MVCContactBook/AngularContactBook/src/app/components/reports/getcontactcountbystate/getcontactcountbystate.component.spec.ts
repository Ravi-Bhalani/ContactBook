import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcontactcountbystateComponent } from './getcontactcountbystate.component';

describe('GetcontactcountbystateComponent', () => {
  let component: GetcontactcountbystateComponent;
  let fixture: ComponentFixture<GetcontactcountbystateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetcontactcountbystateComponent]
    });
    fixture = TestBed.createComponent(GetcontactcountbystateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
