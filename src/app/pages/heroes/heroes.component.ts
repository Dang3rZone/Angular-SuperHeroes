import { Component } from '@angular/core';
import { Hero } from 'src/app/core/models/heroes';
import { HeroesService } from 'src/app/core/services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
  displayProgressbar: boolean = false;

  heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit() {
    this.loadHeroes();
  }

  loadHeroes() {
    this.heroesService
      .getAllHeroes()
      .subscribe((heroes) => (this.heroes = heroes));
  }

  onDeleteHero(id: number) {
    this.heroesService.deleteHero(id).subscribe(() => this.loadHeroes());
  }

  onEditHero(hero: Hero) {}

  onAddHero() {}
}
