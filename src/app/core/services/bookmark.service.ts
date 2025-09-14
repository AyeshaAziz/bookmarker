import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';

import { Bookmark } from '../models/bookmark.model';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  private http = inject(HttpClient);

  private base = 'http://localhost:3000/bookmarks';

  getAll(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.base);
  }
  create(bookmark: Partial<Bookmark>) {
    return this.http.post<Bookmark>(this.base, bookmark);
  }
  update(bookmark: Bookmark) {
    return this.http.put<Bookmark>(`${this.base}/${bookmark.id}`, bookmark);
  }
  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

}
