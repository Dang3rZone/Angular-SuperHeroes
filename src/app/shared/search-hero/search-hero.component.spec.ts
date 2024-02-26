import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchHeroComponent } from './search-hero.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchHeroComponent', () => {
  let component: SearchHeroComponent;
  let fixture: ComponentFixture<SearchHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchHeroComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
