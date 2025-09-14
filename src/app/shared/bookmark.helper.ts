import { Observable, of } from 'rxjs';
import { Bookmark } from '../core/models/bookmark.model';
import { SharedConstants } from './shared-constants';
import { Categories } from '../core/models/categories.model';

export class BookmarkHelper {
  static createBookmark(bookmark: Partial<Bookmark> | undefined): Bookmark {
    return {
      id: bookmark?.id ?? Date.now().toString(),
      title: bookmark?.title ?? SharedConstants.EMPTY_STRING,
      url: bookmark?.url ?? SharedConstants.EMPTY_STRING,
      description: bookmark?.description ?? SharedConstants.EMPTY_STRING,
      createdAt: bookmark?.createdAt ?? new Date().toISOString(),
    };
  }

  static filterBookmarks(bookmarks: Bookmark[], term: string): Observable<Bookmark[]> {
    if (!term) return of([]);
    const filtered = bookmarks
      .map((bookmark) => {
        const keys = Object.keys(bookmark) as (keyof Bookmark)[];
        return this.matchSearchTerm(keys, term, bookmark);
      })
      .filter(Boolean) as Bookmark[];
    return of(filtered);
  }

  static getBookmarkCategory(dateString: string): Categories {
    const bookmarkDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - SharedConstants.ONE);

    const bookmarkDay = new Date(bookmarkDate);
    bookmarkDay.setHours(0, 0, 0, 0);

    if (bookmarkDay.getTime() === today.getTime()) return Categories.Today;
    if (bookmarkDay.getTime() === yesterday.getTime()) return Categories.Yesterday;
    return Categories.Older;
  }

  private static matchSearchTerm(
    keys: (keyof Bookmark)[],
    term: string,
    bookmark: Bookmark
  ): Bookmark | undefined {
    const isMatch = keys.some((field) => {
      const fieldValue = bookmark[field];
      if (!fieldValue) return false;

      if (Array.isArray(fieldValue)) {
        return fieldValue.some((value) => this.compareValues(value, term));
      } else {
        return this.compareValues(fieldValue, term);
      }
    });

    return isMatch ? bookmark : undefined;
  }

  private static compareValues(value: string, term: string): boolean {
    return value.toLowerCase().includes(term.toLowerCase());
  }
}
