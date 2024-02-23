import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Hero } from 'src/app/core/models/heroes';
import { HeroesService } from 'src/app/core/services/heroes.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  displayProgressbar = false;
  heroes: Hero[] = [];

  constructor(
    private heroesService: HeroesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchHeroes();
  }

  fetchHeroes() {
    this.heroesService
      .getAllHeroes()
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.hideLoader())
      )
      .subscribe({
        next: (heroes) => (this.heroes = heroes),
        error: (error) => this.handleError(error),
      });
  }

  onDeleteHero(id: number) {
    this.confirmAction(() => {
      this.heroesService
        .deleteHero(id)
        .pipe(
          takeUntil(this.unsubscribe$),
          finalize(() => this.hideLoader())
        )
        .subscribe({
          next: () => this.fetchHeroes(),
          error: (error) => this.handleError(error),
        });
    });
  }

  onEditHero(hero: Hero) {
    this.openDialog(hero)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.confirmAction(() => {
            this.heroesService
              .updateHero({ ...result, id: hero.id })
              .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => this.hideLoader())
              )
              .subscribe({
                next: () => this.fetchHeroes(),
                error: (error) => this.handleError(error),
              });
          });
        }
      });
  }

  onAddHero() {
    this.openDialog()
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.confirmAction(() => {
            this.heroesService
              .createNewHero(result)
              .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => this.hideLoader())
              )
              .subscribe({
                next: () => this.fetchHeroes(),
                error: (error) => this.handleError(error),
              });
          });
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private showLoader() {
    this.displayProgressbar = true;
  }

  private hideLoader() {
    this.displayProgressbar = false;
  }

  private handleError(error: any) {
    this.hideLoader();
    console.error('An error occurred', error);
  }

  private openDialog(hero?: Hero) {
    return this.dialog.open(DialogComponent, {
      width: '250px',
      data: { hero },
    });
  }

  private confirmAction(action: () => void) {
    this.showLoader();
    action();
  }
}
