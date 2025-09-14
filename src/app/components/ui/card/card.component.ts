import { MatIcon, MatIconModule } from '@angular/material/icon';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Bookmark } from '../../../core/models/bookmark.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCard, MatIcon, MatCardContent, CommonModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() bookmarks!: Bookmark[];
  @Output() updateEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  onEditClicked(bookmark: Bookmark): void {
    this.updateEvent.emit(bookmark);
  }

  onDeleteClicked(id: string): void {
    this.deleteEvent.emit(id);
  }
}
