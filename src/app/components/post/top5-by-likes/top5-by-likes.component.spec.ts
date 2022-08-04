import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top5ByLikesComponent } from './top5-by-likes.component';

describe('Top5ByLikesComponent', () => {
  let component: Top5ByLikesComponent;
  let fixture: ComponentFixture<Top5ByLikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Top5ByLikesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top5ByLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
