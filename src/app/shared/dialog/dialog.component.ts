import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { Hero } from '../../core/models/heroes';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  hero?: Hero;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DialogComponent implements OnInit {
  heroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      publisher: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.hero) {
      const { name, publisher } = this.data.hero;
      this.heroForm.setValue({ name, publisher });
    }
  }

  get name() {
    return this.heroForm.get('name');
  }

  get publisher() {
    return this.heroForm.get('publisher');
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      const heroData: Hero = {
        ...this.heroForm.value,
        id: this.data.hero?.id,
      };
      this.dialogRef.close(heroData);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
