import { HeroesService } from 'src/app/core/services/heroes.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, firstValueFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Hero } from '../../core/models/heroes';

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
  private unsubscribe$ = new Subject<void>();

  heroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private heroesService: HeroesService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Hero
  ) {
    this.heroForm = this.fb.group({
      name: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.data?.name) {
      this.heroForm.patchValue({
        name: this.data.name.toUpperCase(),
        publisher: this.data.publisher,
      });
    }
  }
  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  async onSubmit(): Promise<void> {
    if (this.heroForm.valid) {
      const heroData = { ...this.heroForm.value };

      heroData.name = this.capitalizeFirstLetter(heroData.name);
      heroData.publisher = this.capitalizeFirstLetter(heroData.publisher);

      try {
        if (this.data && this.data.id) {
          await firstValueFrom(
            this.heroesService.updateHero({ ...this.data, ...heroData })
          );
        } else {
          await firstValueFrom(this.heroesService.createNewHero(heroData));
        }
        this.dialogRef.close(true);
      } catch (error) {
        console.error(error);
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
