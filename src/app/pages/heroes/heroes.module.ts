import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesComponent } from './heroes.component';
import { ProgressBarComponent } from 'src/app/shared/progress-bar/progress-bar.component';
import { HeroCardComponent } from 'src/app/shared/hero-card/hero-card.component';
import { MatIconModule } from '@angular/material/icon';
import { HeroesRoutingModule } from './heroes-routing.module';

@NgModule({
  declarations: [HeroesComponent],
  imports: [
    CommonModule,
    ProgressBarComponent,
    HeroCardComponent,
    MatIconModule,
    HeroesRoutingModule,
  ],
})
export class HeroesModule {}
