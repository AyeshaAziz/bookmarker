import { BookmarkHelper } from './../shared/bookmark.helper';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as fromBookmarkActions from './actions';
import { Bookmark } from '../core/models/bookmark.model';

export interface BookmarkState extends EntityState<Bookmark> {
  loading: boolean;
  searchTerm?: string;
  filtered?: Bookmark[];
}

export const adapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>({
  selectId: (bookmark) => bookmark.id,
});

export const initialState: BookmarkState = adapter.getInitialState({
  loading: false,
  searchTerm: undefined,
  filtered: undefined,
});

export const reducer = createReducer(
  initialState,

  on(fromBookmarkActions.loadBookmarks, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromBookmarkActions.loadBookmarksSuccess, (state, { bookmarks }) =>
    adapter.setAll(bookmarks, { ...state, loading: false })
  ),
  on(fromBookmarkActions.addBookmark, (state, { bookmark }) =>
    adapter.addOne(BookmarkHelper.createBookmark(bookmark), { ...state, loading: false })
  ),

  on(fromBookmarkActions.updateBookmark, (state, { bookmark }) => {
    if (!bookmark.id) return state;
    return adapter.updateOne(
      { id: bookmark.id, changes: bookmark },
      { ...state, loading: false }
    );
  }),
  on(fromBookmarkActions.deleteBookmark, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(fromBookmarkActions.searchBookmarks, (state, { searchTerm }) => ({
    ...state,
    loading: false,
    searchTerm,
  })),
  on(fromBookmarkActions.searchBookmarksSuccess, (state, { result }) => ({
    ...state,
    loading: false,
    filtered: result,
  })),
);
