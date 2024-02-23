import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHeroDialogComponent } from './dialog.component';

describe('NewHeroDialogComponent', () => {
  let component: NewHeroDialogComponent;
  let fixture: ComponentFixture<NewHeroDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewHeroDialogComponent],
    });
    fixture = TestBed.createComponent(NewHeroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
