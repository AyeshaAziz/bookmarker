import * as fromActions from './actions';
import { Bookmark } from '../core/models/bookmark.model';

describe('Bookmark Actions', () => {
  const dummyBookmark: Bookmark = {
    id: '1',
    title: 'Test',
    url: 'http://example.com',
    description: '',
    createdAt: new Date().toISOString(),
  };

  it('should create loadBookmarks action', () => {
    // Act
    const action = fromActions.loadBookmarks();

    // Assert
    expect(action.type).toBe(fromActions.BookmarkActions.Load);
  });

  it('should create loadBookmarksSuccess action', () => {
    // Arrange
    const bookmarks = [dummyBookmark];

    // Act
    const action = fromActions.loadBookmarksSuccess({ bookmarks });

    // Assert
    expect(action.type).toBe(fromActions.BookmarkActions.LoadSuccess);
    expect(action.bookmarks).toEqual(bookmarks);
  });

  it('should create addBookmark action', () => {
    // Arrange
    const bookmark = dummyBookmark;

    // Act
    const action = fromActions.addBookmark({ bookmark });

    // Assert
    expect(action.type).toBe(fromActions.BookmarkActions.Add);
    expect(action.bookmark).toEqual(bookmark);
  });

  it('should create updateBookmark action', () => {
    // Arrange
    const bookmark = dummyBookmark;

    // Act
    const action = fromActions.updateBookmark({ bookmark });

    // Assert
    expect(action.type).toBe(fromActions.BookmarkActions.Update);
    expect(action.bookmark).toEqual(bookmark);
  });

  it('should create deleteBookmark action', () => {
    // Arrange
    const id = '1';

    // Act
    const action = fromActions.deleteBookmark({ id });

    // Assert
    expect(action.type).toBe(fromActions.BookmarkActions.Delete);
    expect(action.id).toBe(id);
  });

  it('should create searchBookmarks action', () => {
    // Arrange
    const searchTerm = 'test';

    // Act
    const action = fromActions.searchBookmarks({ searchTerm });

    // Assert
    expect(action.type).toBe(fromActions.BookmarkActions.Search);
    expect(action.searchTerm).toBe(searchTerm);
  });

  it('should create searchBookmarksSuccess action', () => {
    // Arrange
    const result = [dummyBookmark];

    // Act
    const action = fromActions.searchBookmarksSuccess({ result });

    // Assert
    expect(action.type).toBe(fromActions.BookmarkActions.SearchSuccess);
    expect(action.result).toEqual(result);
  });

  it('should create dialogClosed action', () => {
    // Arrange
    const bookmark = dummyBookmark;

    // Act
    const action = fromActions.dialogClosed({ bookmark });

    // Assert
    expect(action.type).toBe(fromActions.BookmarkActions.Close);
    expect(action.bookmark).toEqual(bookmark);
  });
});
