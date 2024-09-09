import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcontactscountbasedoncountryComponent } from './getcontactscountbasedoncountry.component';

describe('GetcontactscountbasedoncountryComponent', () => {
  let component: GetcontactscountbasedoncountryComponent;
  let fixture: ComponentFixture<GetcontactscountbasedoncountryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetcontactscountbasedoncountryComponent]
    });
    fixture = TestBed.createComponent(GetcontactscountbasedoncountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
