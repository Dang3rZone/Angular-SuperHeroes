import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-hero',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './search-hero.component.html',
  styleUrls: ['./search-hero.component.scss'],
})
export class SearchHeroComponent {
  @Output() search = new EventEmitter<string>();

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.search.emit(target.value);
  }
}
