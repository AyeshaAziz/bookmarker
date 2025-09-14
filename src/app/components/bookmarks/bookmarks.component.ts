import { SharedConstants } from './../../shared/shared-constants';
import {
  deleteBookmark,
  dialogClosed,
  loadBookmarks,
  searchBookmarks,
} from './../../store/actions';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { GroupListComponent } from '../ui/group-list/group-list.component';
import { ToolbarComponent } from '../ui/toolbar/toolbar.component';
import { Bookmark } from '../../core/models/bookmark.model';
import { getFilteredBookmarks, getLoading } from '../../store/selectors';
import { BookmarkDialogComponent } from '../ui/bookmark-dialog/bookmark-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { trigger, transition, style, animate } from '@angular/animations';

const EDIT_TITLE = 'Edit Bookmark';
const ADD_TITLE = 'Create New Bookmark';
const ADD_LABEL = 'Add';
const UPDATE_LABEL = 'Update';
const WIDTH = '60vw';
const HEIGHT = '70vh';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    GroupListComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('transitionMessages', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('250ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class Bookmarks implements OnInit, OnDestroy {
  title = 'Bookmarker';
  searchLabel = 'Filter Bookmarks ...';
  bookmarks$ = new Observable<Bookmark[]>();
  isLoading$ = new Observable<boolean>();
  isDialogOpen = false;

  private store = inject(Store);
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);
  private sub: Subscription = new Subscription();

  ngOnInit(): void {
    this.loadBookmarks();
    this.bookmarks$ = this.store.select(getFilteredBookmarks);
    this.isLoading$ = this.store.select(getLoading);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSearch(value: string): void {
    this.store.dispatch(searchBookmarks({ searchTerm: value }));
  }

  showDialog(bookmark?: Bookmark): void {
    this.isDialogOpen = true;
    const dialogRef: MatDialogRef<BookmarkDialogComponent, Bookmark | undefined> =
      this.dialog.open(BookmarkDialogComponent, {
        width: WIDTH,
        height: HEIGHT,
        data: this.mapData(bookmark),
      });

    this.sub = dialogRef.afterClosed().subscribe((result) => {
      if (result?.title) {
        this.store.dispatch(dialogClosed({ bookmark: result }));
      }
      this.isDialogOpen = false;
      this.cdr.detectChanges();
    });
  }

  deleteItem(id: string): void {
    this.store.dispatch(deleteBookmark({ id }));
  }

  clearSearchterm(): void {
    this.store.dispatch(
      searchBookmarks({ searchTerm: SharedConstants.EMPTY_STRING })
    );
  }

  private mapData(bookmark?: Bookmark) {
    return {
      id: bookmark?.id,
      dialogTitle: bookmark ? EDIT_TITLE : ADD_TITLE,
      buttonLabel: bookmark ? UPDATE_LABEL : ADD_LABEL,
      title: bookmark?.title ?? SharedConstants.EMPTY_STRING,
      url: bookmark?.url ?? SharedConstants.EMPTY_STRING,
      description: bookmark?.description ?? SharedConstants.EMPTY_STRING,
    };
  }

  private loadBookmarks(): void {
    this.store.dispatch(loadBookmarks());
  }
}
