import {
  selectBookmarkState,
  selectAllBookmarks,
  getLoading,
  getSearchTerm,
  getFilteredBookmarks,
} from './selectors';
import { BookmarkState } from './reducer';
import { SharedConstants } from '../shared/shared-constants';
import { Bookmark } from '../core/models/bookmark.model';

describe('Bookmark Selectors', () => {
  const mockBookmarks: Bookmark[] = [
    { id: '1', title: 'title', url: 'http://a.com', description: SharedConstants.EMPTY_STRING, createdAt: new Date().toISOString() },
    { id: '2', title: 'title', url: 'http://b.com', description: SharedConstants.EMPTY_STRING, createdAt: new Date().toISOString() },
  ];
  
  const mockState: BookmarkState = {
    ids: ['1', '2'],
    entities: {
      '1': mockBookmarks[SharedConstants.ZERO],
      '2': mockBookmarks[SharedConstants.ONE],
    },
    loading: true,
    searchTerm: 'A',
    filtered: [mockBookmarks[SharedConstants.ZERO]],
  };

  it('should select bookmark feature state', () => {
    // Act
    const result = selectBookmarkState.projector(mockState);

    // Assert
    expect(result).toEqual(mockState);
  });

  it('should select all bookmarks', () => {
    // Act
    const result = selectAllBookmarks.projector(mockState);

    // Assert
    expect(result).toEqual(mockBookmarks);
  });

  it('should select loading', () => {
    // Act
    const result = getLoading.projector(mockState);

    // Assert
    expect(result).toBe(true);
  });

  it('should select searchTerm or empty string', () => {
    // Act & Assert
    expect(getSearchTerm.projector(mockState)).toBe('A');

    // Arrange
    const emptySearchState = { ...mockState, searchTerm: undefined };

    // Act & Assert
    expect(getSearchTerm.projector(emptySearchState)).toBe(SharedConstants.EMPTY_STRING);
  });

  it('should select filtered bookmarks', () => {
    // Act
    const result = getFilteredBookmarks.projector(mockState, mockBookmarks);

    // Assert
    expect(result).toEqual([mockBookmarks[SharedConstants.ZERO]]);

    // Arrange
    const noSearchState = { ...mockState, searchTerm: SharedConstants.EMPTY_STRING };

    // Act
    const resultNoSearch = getFilteredBookmarks.projector(noSearchState, mockBookmarks);

    // Assert
    expect(resultNoSearch).toEqual(mockBookmarks);
  });
});
