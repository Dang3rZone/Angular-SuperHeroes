import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { Hero } from 'src/app/core/models/heroes';
import { HeroesService } from 'src/app/core/services/heroes.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
  private unsubscribe$ = new Subject<void>();
  displayProgressbar: boolean = false;
  heroes: Hero[] = [];

  constructor(private heroesService: HeroesService, public dialog: MatDialog) {}

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

  onEditHero(hero: Hero) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: hero,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadHeroes();
      }
    });
  }

  onAddHero() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadHeroes();
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
