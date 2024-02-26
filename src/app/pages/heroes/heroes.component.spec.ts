import { SearchHeroComponent } from 'src/app/shared/search-hero/search-hero.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule
import { HeroesComponent } from './heroes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProgressBarComponent } from 'src/app/shared/progress-bar/progress-bar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        SearchHeroComponent,
        MatIconModule,
        ProgressBarComponent,
        NoopAnimationsModule,
      ],
      declarations: [HeroesComponent],
    }).compileComponents(); // Compila los componentes

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
