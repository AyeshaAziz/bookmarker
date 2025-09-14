import { reducer, initialState, BookmarkState } from './reducer';
import * as fromBookmarkActions from './actions';
import { BookmarkHelper } from '../shared/bookmark.helper';
import { Bookmark } from '../core/models/bookmark.model';
import { SharedConstants } from '../shared/shared-constants';

describe('Bookmark Reducer', () => {
  const mockBookmarks: Bookmark[] = [
    {
      id: '1',
      title: 'Title 1',
      url: 'http://a.com',
      description: SharedConstants.EMPTY_STRING,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Title 2',
      url: 'http://b.com',
      description: SharedConstants.EMPTY_STRING,
      createdAt: new Date().toISOString(),
    },
  ];

  it('should set loading to true on loadBookmarks', () => {
    const state = reducer(initialState, fromBookmarkActions.loadBookmarks());
    expect(state.loading).toBe(true);
  });

  it('should set all bookmarks on loadBookmarksSuccess', () => {
    const state = reducer(
      initialState,
      fromBookmarkActions.loadBookmarksSuccess({ bookmarks: mockBookmarks })
    );
    expect(state.ids.length).toBe(2);
    expect(state.entities['1']).toEqual(mockBookmarks[0]);
    expect(state.entities['2']).toEqual(mockBookmarks[1]);
    expect(state.loading).toBe(false);
  });

  it('should add a bookmark on addBookmark', () => {
    const newBookmark: Bookmark = {
      id: '3',
      title: 'Title 3',
      url: 'http://c.com',
      description: SharedConstants.EMPTY_STRING,
      createdAt: new Date().toISOString(),
    };

    spyOn(BookmarkHelper, 'createBookmark').and.returnValue(newBookmark);

    const state = reducer(
      initialState,
      fromBookmarkActions.addBookmark({ bookmark: newBookmark })
    );

    expect(state.ids.length).toBe(1);
    expect(state.entities['3']).toEqual(newBookmark);
    expect(state.loading).toBe(false);
  });

  it('should update a bookmark on updateBookmark', () => {
    const preloadedState: BookmarkState = reducer(
      initialState,
      fromBookmarkActions.loadBookmarksSuccess({ bookmarks: mockBookmarks })
    );
    const updatedBookmark: Bookmark = {
      ...mockBookmarks[0],
      title: 'Updated Title',
    };

    const state = reducer(
      preloadedState,
      fromBookmarkActions.updateBookmark({ bookmark: updatedBookmark })
    );

    expect(state.entities['1']?.title).toBe('Updated Title');
    expect(state.loading).toBe(false);
  });

  it('should not update if bookmark id is missing', () => {
    const bookmarkWithoutId: Partial<Bookmark> = {
      title: 'No ID',
      url: 'http://x.com',
      description: SharedConstants.EMPTY_STRING,
      createdAt: new Date().toISOString(),
    };

    const state = reducer(
      initialState,
      fromBookmarkActions.updateBookmark({ bookmark: bookmarkWithoutId })
    );

    expect(state).toEqual(initialState);
  });

  it('should remove a bookmark on deleteBookmark', () => {
    const preloadedState: BookmarkState = reducer(
      initialState,
      fromBookmarkActions.loadBookmarksSuccess({ bookmarks: mockBookmarks })
    );

    const state = reducer(
      preloadedState,
      fromBookmarkActions.deleteBookmark({ id: '1' })
    );

    expect(state.ids.length).toBe(1);
    expect(state.entities['1']).toBeUndefined();
    expect(state.loading).toBe(false);
  });

  it('should set searchTerm on searchBookmarks', () => {
    const state = reducer(
      initialState,
      fromBookmarkActions.searchBookmarks({ searchTerm: 'A' })
    );

    expect(state.searchTerm).toBe('A');
    expect(state.loading).toBe(false);
  });

  it('should set filtered bookmarks on searchBookmarksSuccess', () => {
    const state = reducer(
      initialState,
      fromBookmarkActions.searchBookmarksSuccess({ result: [mockBookmarks[0]] })
    );

    expect(state.filtered?.length).toBe(1);
    expect(state.filtered?.[0]).toEqual(mockBookmarks[0]);
    expect(state.loading).toBe(false);
  });
});
