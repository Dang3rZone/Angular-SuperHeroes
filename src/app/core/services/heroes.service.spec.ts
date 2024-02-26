import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HeroesService } from './heroes.service';
import { Hero } from '../models/heroes';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpMock: HttpTestingController;
  let apiUrl = 'http://localhost:3000/heroes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService],
    });
    service = TestBed.inject(HeroesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getAllHeroes() should return heroes', () => {
    const dummyHeroes: Hero[] = [
      { id: 1, name: 'Hero 1', publisher: 'Publisher 1' },
      { id: 2, name: 'Hero 2', publisher: 'Publisher 2' },
    ];

    service.getAllHeroes().subscribe((heroes) => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(dummyHeroes);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyHeroes);
  });

  it('getHeroById() should return a hero', () => {
    const dummyHero: Hero = {
      id: 1,
      name: 'Hero Name',
      publisher: 'Hero Publisher',
    };

    service.getHeroById(1).subscribe((hero) => {
      expect(hero).toEqual(dummyHero);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyHero);
  });

  it('createNewHero() should post and return the new hero', () => {
    const newHero: Hero = {
      id: 3,
      name: 'New Hero',
      publisher: 'New Publisher',
    };

    service.createNewHero(newHero).subscribe((hero) => {
      expect(hero).toEqual(newHero);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newHero);
    req.flush(newHero);
  });

  it('getHeroesByName() should return heroes by name', () => {
    const dummyHeroes: Hero[] = [
      { id: 2, name: 'Test Hero', publisher: 'Publisher 1' },
    ];

    service.getHeroesByName('Test Hero').subscribe((heroes) => {
      expect(heroes.length).toBe(1);
      expect(heroes).toEqual(dummyHeroes);
    });

    const req = httpMock.expectOne(`${apiUrl}?name=Test Hero`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyHeroes);
  });

  it('updateHero() should PUT and return the updated hero', () => {
    const updatedHero: Hero = {
      id: 1,
      name: 'Updated Hero Name',
      publisher: 'Updated Publisher',
    };

    service.updateHero(updatedHero).subscribe((hero) => {
      expect(hero).toEqual(updatedHero);
    });

    const req = httpMock.expectOne(`${apiUrl}/${updatedHero.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedHero);
    req.flush(updatedHero);
  });

  it('deleteHero() should delete a hero and return empty object', () => {
    const heroIdToDelete = '1';

    service.deleteHero(parseInt(heroIdToDelete)).subscribe((response) => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${apiUrl}/${heroIdToDelete}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
