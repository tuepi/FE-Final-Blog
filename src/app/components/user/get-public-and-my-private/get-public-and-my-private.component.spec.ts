import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPublicAndMyPrivateComponent } from './get-public-and-my-private.component';

describe('GetPublicAndMyPrivateComponent', () => {
  let component: GetPublicAndMyPrivateComponent;
  let fixture: ComponentFixture<GetPublicAndMyPrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPublicAndMyPrivateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetPublicAndMyPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
