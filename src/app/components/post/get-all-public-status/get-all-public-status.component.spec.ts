import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllPublicStatusComponent } from './get-all-public-status.component';

describe('GetAllPublicStatusComponent', () => {
  let component: GetAllPublicStatusComponent;
  let fixture: ComponentFixture<GetAllPublicStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllPublicStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllPublicStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
