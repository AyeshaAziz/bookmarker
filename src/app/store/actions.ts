import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../core/models/bookmark.model';

export enum BookmarkActions {
  Load = '[Bookmarks] Load',
  LoadSuccess = '[Bookmarks] Load Success',
  Add = '[Bookmarks] Add',
  Update = '[Bookmarks] Update',
  Delete = '[Bookmarks] Delete',
  Search = '[Bookmarks Toolbar] Search',
  SearchSuccess ='[Bookmarks Toolbar] Search Success',
  Close= '[Dialog] Close',
  searchBookmarksSuccess = "searchBookmarksSuccess"
}

export const loadBookmarks = createAction(BookmarkActions.Load);
export const loadBookmarksSuccess = createAction(
  BookmarkActions.LoadSuccess,
  props<{ bookmarks: Bookmark[] }>()
);

export const addBookmark = createAction(
  BookmarkActions.Add,
  props<{ bookmark: Partial<Bookmark> }>()
);
export const updateBookmark = createAction(
  BookmarkActions.Update,
  props<{ bookmark: Partial<Bookmark> }>()
);
export const deleteBookmark = createAction(
  BookmarkActions.Delete,
  props<{ id: string }>()
);
export const searchBookmarks = createAction(
  BookmarkActions.Search,
  props<{ searchTerm: string }>()
);
export const searchBookmarksSuccess = createAction(
  BookmarkActions.SearchSuccess,
    props<{ result: Bookmark[] }>()
);
export const dialogClosed = createAction(
  BookmarkActions.Close,
  props<{bookmark: Partial<Bookmark> }>()
);
