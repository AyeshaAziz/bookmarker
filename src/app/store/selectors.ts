import { BookmarkHelper } from './../shared/bookmark.helper';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, BookmarkState } from './reducer';
import { Categories } from '../core/models/categories.model';
import { SharedConstants } from '../shared/shared-constants';
import { GroupedBookmarks } from '../core/models/grouped-bookmarks';
import { Bookmark } from '../core/models/bookmark.model';
const FEATURE_KEY = 'bookmarks';

export const selectBookmarkState =
  createFeatureSelector<BookmarkState>(FEATURE_KEY);

export const { selectAll: selectAllBookmarks } =
  adapter.getSelectors(selectBookmarkState);

export const getLoading = createSelector(
  selectBookmarkState,
  (state) => state.loading ?? false
);

export const getSearchTerm = createSelector(
  selectBookmarkState,
  (state) => state.searchTerm ?? SharedConstants.EMPTY_STRING
);

export const getFilteredBookmarks = createSelector(
  selectBookmarkState,
  selectAllBookmarks,
  (state, allBookmarks) => {
    if (!state.searchTerm) {
      return allBookmarks ?? [];
    }
    return state.filtered ?? [];
  }
);

export const getGroupedBookmarks = createSelector(
  getFilteredBookmarks,
  (filteredBookmarks) => {
    return filteredBookmarks.reduce(
      (groups: GroupedBookmarks, bookmark: Bookmark) => {
        const category = BookmarkHelper.getBookmarkCategory(bookmark.createdAt);
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(bookmark);
        return groups;
      },
      {} as Record<Categories, typeof filteredBookmarks>
    );
  }
);
