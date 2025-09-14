import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
import { Effects } from './effects';
import { BookmarkService } from '../core/services/bookmark.service';
import {
  loadBookmarksSuccess,
  BookmarkActions,
  searchBookmarksSuccess,
  updateBookmark,
} from './actions';
import { Bookmark } from '../core/models/bookmark.model';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectAllBookmarks } from './selectors';
import { searchBookmarks } from './actions';
import { BookmarkHelper } from '../shared/bookmark.helper';
import { Action } from '@ngrx/store';

describe('Effects', () => {
let actions$: Observable<Action>;
  let effects: Effects;
  let bookmarkService: jasmine.SpyObj<BookmarkService>;
  let store: MockStore;

  const mockBookmarks: Bookmark[] = [
    { id: '1', title: 'A', url: 'http://a.com', description: '', createdAt: new Date().toISOString() },
    { id: '2', title: 'B', url: 'http://b.com', description: '', createdAt: new Date().toISOString() },
  ];

  beforeEach(() => {
    const bookmarkServiceSpy = jasmine.createSpyObj('BookmarkService', ['getAll', 'create', 'update', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        Effects,
        provideMockActions(() => actions$),
        { provide: BookmarkService, useValue: bookmarkServiceSpy },
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(Effects);
    bookmarkService = TestBed.inject(BookmarkService) as jasmine.SpyObj<BookmarkService>;
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllBookmarks, mockBookmarks);
  });

  it('should dispatch loadBookmarksSuccess when loadBookmarks$ succeeds', () => {
    const action = { type: BookmarkActions.Load };
    actions$ = hot('-a', { a: action });
    bookmarkService.getAll.and.returnValue(cold('-b|', { b: mockBookmarks }));

    const expected = cold('--c', {
      c: loadBookmarksSuccess({ bookmarks: mockBookmarks }),
    });

    expect(effects.loadBookmarks$).toBeObservable(expected);
  });

  it('should map Close action with id to updateBookmark', () => {
    const bookmark = { id: '1', title: 'A', url: 'http://a.com', description: '' };
    const action = { type: BookmarkActions.Close, bookmark };
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: updateBookmark({ bookmark }) });

    expect(effects.updateBookmark$).toBeObservable(expected);
  });

  it('should map Close action without id to addBookmark', (done) => {
    const bookmark = { title: 'New', url: '', description: '' };
    const action = { type: BookmarkActions.Close, bookmark };
    actions$ = of(action);

    effects.addBookmark$.subscribe((resultAction) => {
      expect(resultAction.type).toBe(BookmarkActions.Add);
      expect(resultAction.bookmark.id).toBeTruthy();
      expect(resultAction.bookmark.createdAt).toBeTruthy();
      done();
    });
  });

  it('should dispatch searchBookmarksSuccess when filterBookmarks returns data', (done) => {
    const searchTerm = 'A';
    const action = searchBookmarks({ searchTerm });
    const filteredBookmarks = [mockBookmarks[0]];

    spyOn(BookmarkHelper, 'filterBookmarks').and.returnValue(of(filteredBookmarks));

    actions$ = of(action);

    effects.filterBookmarks$.subscribe((resultAction) => {
      expect(resultAction).toEqual(
        searchBookmarksSuccess({ result: filteredBookmarks })
      );

      expect(BookmarkHelper.filterBookmarks).toHaveBeenCalledWith(mockBookmarks, searchTerm);
      done();
    });
  });
});
