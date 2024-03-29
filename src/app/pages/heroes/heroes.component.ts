import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Hero } from 'src/app/core/models/heroes';
import { HeroesService } from 'src/app/core/services/heroes.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { ErrorHandlerService } from 'src/app/core/services/errorhandler.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  displayProgressbar = false;
  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];

  constructor(
    private heroesService: HeroesService,
    private dialog: MatDialog,
    private errorHandlerService: ErrorHandlerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchHeroes();
  }

  fetchHeroes() {
    this.showLoader();
    this.heroesService
      .getAllHeroes()
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.hideLoader())
      )
      .subscribe({
        next: (heroes) => {
          this.heroes = heroes;
          this.filteredHeroes = [...this.heroes];
        },
        error: (error) => this.errorHandlerService.handleError(error),
      });
  }

  filterHeroes(searchTerm: string) {
    this.showLoader();
    if (!searchTerm) {
      this.filteredHeroes = [...this.heroes];
    } else {
      this.filteredHeroes = this.heroes
        .filter((hero) =>
          hero.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
        .map((hero) => ({
          ...hero,
          name: hero.name.charAt(0).toUpperCase() + hero.name.slice(1),
        }));
    }
    this.hideLoader();
  }

  onDeleteHero(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.showLoader();
        this.heroesService
          .deleteHero(id)
          .pipe(
            takeUntil(this.unsubscribe$),
            finalize(() => this.hideLoader())
          )
          .subscribe({
            next: () => {
              this.fetchHeroes(),
                this.showNotification('Héroe eliminado exitosamente');
            },
            error: (error) => {
              this.errorHandlerService.handleError(error),
                this.showNotification('Error al eliminar el héroe');
            },
          });
      }
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
                next: () => {
                  this.fetchHeroes(),
                    this.showNotification('Héroe se edito exitosamente');
                },
                error: (error) => {
                  this.errorHandlerService.handleError(error),
                    this.showNotification('Error al editar el héroe');
                },
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
                next: () => {
                  this.fetchHeroes(),
                    this.showNotification('Héroe se creo exitosamente');
                },
                error: (error) => {
                  this.errorHandlerService.handleError(error),
                    this.showNotification('Error al crear el héroe');
                },
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

  private showNotification(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, // Cierra después de 3000ms
    });
  }
}
