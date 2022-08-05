import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMyPostsComponent } from './get-my-posts.component';

describe('GetMyPostsComponent', () => {
  let component: GetMyPostsComponent;
  let fixture: ComponentFixture<GetMyPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetMyPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetMyPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
