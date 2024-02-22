import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesComponent } from './heroes.component';
import { ProgressBarComponent } from 'src/app/shared/progress-bar/progress-bar.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HeroesComponent],
  imports: [
    CommonModule,
    ProgressBarComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class HeroesModule {}
