import { GroupedBookmarks } from './../../../core/models/grouped-bookmarks';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Store } from '@ngrx/store';
import { getGroupedBookmarks, getSearchTerm } from '../../../store/selectors';
import { Observable } from 'rxjs';
import { Categories } from '../../../core/models/categories.model';
import { Bookmark } from '../../../core/models/bookmark.model';
import { SharedConstants } from '../../../shared/shared-constants';

const NO_MATCH = 'No matching bookmarks found';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupListComponent implements OnInit {
  @Output() updateEvent = new EventEmitter<Bookmark>();
@Output() deleteEvent = new EventEmitter<string>();

  categories = Object.keys(Categories);
  groupedBookmarks$ = new Observable<GroupedBookmarks>();
  searchTerm$!: Observable<string>;

  noMatchText = NO_MATCH;
  private store = inject(Store);

  ngOnInit(): void {
    this.searchTerm$ = this.store.select(getSearchTerm);
    this.groupedBookmarks$ = this.store.select(getGroupedBookmarks);
  }

  onUpdateButtonClicked(event: Bookmark): void {
    this.updateEvent.emit(event);
  }

  hasBookmarks(groups: Record<string, Bookmark[]> = {}): boolean {
  return Object.values(groups).some(
    (bookmarks) => bookmarks.length > SharedConstants.ZERO
  );
}


  onDeleteButtonClicked(id: string): void {
    this.deleteEvent.emit(id);
  }
}
