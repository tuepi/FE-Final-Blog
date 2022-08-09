import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetByLabelComponent } from './get-by-label.component';

describe('GetByLabelComponent', () => {
  let component: GetByLabelComponent;
  let fixture: ComponentFixture<GetByLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetByLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetByLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
