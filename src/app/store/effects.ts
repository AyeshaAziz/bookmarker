import { Bookmark } from './../core/models/bookmark.model';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  EMPTY,
  Observable,
  debounceTime,
  distinctUntilChanged,
  withLatestFrom,
  filter,
} from 'rxjs';
import { BookmarkService } from '../core/services/bookmark.service';
import {
  addBookmark,
  BookmarkActions,
  loadBookmarksSuccess,
  searchBookmarksSuccess,
  updateBookmark,
} from './actions';
import { BookmarkHelper } from '../shared/bookmark.helper';
import { Store } from '@ngrx/store';
import { selectAllBookmarks } from './selectors';

const DEBOUNCE_TIME = 250;

@Injectable()
export class Effects {
  store = inject(Store);
  actions$ = inject(Actions);
  private bookmarkService = inject(BookmarkService);

  loadBookmarks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookmarkActions.Load),
      mergeMap(() =>
        this.bookmarkService.getAll().pipe(
          map((bookmarks) => loadBookmarksSuccess({ bookmarks })),
          catchError((error) => this.handleEror(error))
        )
      )
    );
  });

  filterBookmarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.Search),
      debounceTime(DEBOUNCE_TIME),
      distinctUntilChanged(
        (previous, latest) => previous.searchTerm === latest.searchTerm
      ),
      filter((action) => !!action.searchTerm),
      withLatestFrom(this.store.select(selectAllBookmarks)),
      switchMap(([action, allBookmarks]) => {
        return BookmarkHelper.filterBookmarks(
          allBookmarks,
          action.searchTerm
        ).pipe(
          map((filteredBookmarks: Bookmark[]) =>
            searchBookmarksSuccess({ result: filteredBookmarks })
          ),
          catchError((error) => this.handleEror(error))
        );
      })
    )
  );

  add$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.Add),
        mergeMap(({ bookmark }) => this.bookmarkService.create(bookmark))
      ),
    { dispatch: false }
  );

  update$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.Update),
        mergeMap(({ bookmark }) => this.bookmarkService.update(bookmark))
      ),
    { dispatch: false }
  );

  delete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.Delete),
        mergeMap((action) => this.bookmarkService.delete(action.id))
      ),
    { dispatch: false }
  );

  updateBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.Close),
      filter((action) => !!action.bookmark?.id),
      map((action) => {
        return updateBookmark({ bookmark: action.bookmark });
      })
    )
  );

  addBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.Close),
      filter((action) => !action.bookmark?.id),
      map((action) => {
        const date = new Date().toISOString();
        return addBookmark({
          bookmark: { ...action.bookmark, createdAt: date, id: date },
        });
      })
    )
  );

  private handleEror(error: string): Observable<never> {
    console.error('Search error', error);
    return EMPTY;
  }
}
