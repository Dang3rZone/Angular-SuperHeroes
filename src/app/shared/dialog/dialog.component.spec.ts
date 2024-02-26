import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent, DialogData } from './dialog.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };
  const dialogData: DialogData = {
    hero: { id: 1, name: 'Test Hero', publisher: 'Test Publisher' },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogComponent,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the heroForm with data', () => {
    expect(component.heroForm.value).toEqual({
      name: 'Test Hero',
      publisher: 'Test Publisher',
    });
  });

  it('should close the dialog with hero data on submit if form is valid', () => {
    component.heroForm.controls['name'].setValue('New Hero Name');
    component.heroForm.controls['publisher'].setValue('New Publisher');
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      name: 'NEW HERO NAME',
      publisher: 'New Publisher',
      id: 1,
    });
  });

  it('should close the dialog when closeDialog is called', () => {
    component.closeDialog();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
