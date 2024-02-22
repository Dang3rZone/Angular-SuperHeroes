import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Hero } from '../../core/models/heroes';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
})
export class HeroCardComponent {
  @Input() hero!: Hero;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Hero>();

  deleteHero() {
    this.delete.emit(this.hero.id);
  }

  editHero(hero: Hero) {
    this.edit.emit(hero);
  }
}
