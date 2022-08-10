import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelativePostComponent } from './relative-post.component';

describe('RelativePostComponent', () => {
  let component: RelativePostComponent;
  let fixture: ComponentFixture<RelativePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelativePostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelativePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
