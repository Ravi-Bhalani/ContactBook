import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritecontactsComponent } from './favouritecontacts.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('FavouritecontactsComponent', () => {
  let component: FavouritecontactsComponent;
  let fixture: ComponentFixture<FavouritecontactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,FormsModule],
      declarations: [FavouritecontactsComponent]
    });
    fixture = TestBed.createComponent(FavouritecontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
