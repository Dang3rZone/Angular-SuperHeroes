import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { Hero } from 'src/app/core/models/heroes';
import { HeroesService } from 'src/app/core/services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
  private unsubscribe$ = new Subject<void>();
  displayProgressbar: boolean = false;
  heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit() {
    this.loadHeroes();
  }

  loadHeroes() {
    this.displayProgressbar = true;
    this.heroesService
      .getAllHeroes()
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => (this.displayProgressbar = false))
      )
      .subscribe((heroes) => {
        this.heroes = heroes;
      });
  }

  onDeleteHero(id: number) {
    this.displayProgressbar = true;
    this.heroesService
      .deleteHero(id)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => (this.displayProgressbar = false))
      )
      .subscribe(() => {
        this.loadHeroes();
      });
  }

  onEditHero(hero: Hero) {}

  onAddHero() {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
