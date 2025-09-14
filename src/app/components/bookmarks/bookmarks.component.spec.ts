import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Bookmarks } from './bookmarks.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import {
  loadBookmarks,
  searchBookmarks,
  deleteBookmark,
  dialogClosed,
} from './../../store/actions';
import { getFilteredBookmarks, getLoading } from '../../store/selectors';
import { Bookmark } from '../../core/models/bookmark.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedConstants } from '../../shared/shared-constants';
import { By } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

class MockDialogComponent {}

describe('Bookmarks Component', () => {
  let fixture: ComponentFixture<Bookmarks>;
  let component: Bookmarks;
  let store: MockStore;
  let mockDispatch: jasmine.Spy;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  const mockBookmark: Bookmark = {
    id: '123',
    title: 'Test Bookmark',
    url: 'https://test.com',
    description: 'A test bookmark',
    createdAt: new Date().toISOString(),
  };

  const initialState = {
    bookmarks: {
      entities: {},
      ids: [],
      searchTerm: SharedConstants.EMPTY_STRING,
      loading: false,
    },
  };

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    await TestBed.configureTestingModule({
      imports: [Bookmarks, BrowserAnimationsModule, MatProgressSpinnerModule],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            { selector: getFilteredBookmarks, value: [] },
            { selector: getLoading, value: false },
          ],
        }),
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Bookmarks);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    mockDispatch = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    // Arrange, Act & Assert
    expect(component).toBeTruthy();
  });

  it('should dispatch loadBookmarks on init', () => {
    // Arrange, Act & Assert
    expect(mockDispatch).toHaveBeenCalledWith(loadBookmarks());
  });

  it('should dispatch searchBookmarks on search', () => {
    // Arrange, Act
    component.onSearch('test');

    // Assert
    expect(mockDispatch).toHaveBeenCalledWith(
      searchBookmarks({ searchTerm: 'test' })
    );
  });

  it('should dispatch deleteBookmark on deleteItem', () => {
    // Arrange, Act
    component.deleteItem('123');

    // Assert
    expect(mockDispatch).toHaveBeenCalledWith(deleteBookmark({ id: '123' }));
  });

  it('should clear search term', () => {
    // Arrange, Act
    component.clearSearchterm();

    // Assert
    expect(mockDispatch).toHaveBeenCalledWith(
      searchBookmarks({ searchTerm: SharedConstants.EMPTY_STRING })
    );
  });

  it('should open dialog and dispatch dialogClosed when result has title', () => {
    // Arrange
    const afterClosedSpy = jasmine
      .createSpy()
      .and.returnValue(of(mockBookmark));
    const mockDialogRef: Partial<MatDialogRef<MockDialogComponent, Bookmark>> =
      {
        afterClosed: afterClosedSpy,
      };
    mockDialog.open.and.returnValue(
      mockDialogRef as MatDialogRef<MockDialogComponent, Bookmark>
    );

    // Act
    component.showDialog(mockBookmark);

    // Assert
    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(
      dialogClosed({ bookmark: mockBookmark })
    );
    expect(component.isDialogOpen).toBeFalse();
  });
  
  it('should render app-toolbar with correct bindings', () => {
    // Arrange, Act
    fixture.detectChanges();
    const toolbarElement = fixture.debugElement.query(By.css('app-toolbar'));

    // Assert
    expect(toolbarElement).toBeTruthy();
    expect(toolbarElement.attributes['ng-reflect-title']).toBe(component.title);
    expect(toolbarElement.attributes['ng-reflect-search-label']).toBe(
      component.searchLabel
    );
  });

  it('should call onSearch when searchInputChanged is emitted', () => {
    // Arrange
    spyOn(component, 'onSearch');
    fixture.detectChanges();
    const toolbar = fixture.debugElement.query(By.css('app-toolbar'));

    // Act
    toolbar.triggerEventHandler('searchInputChanged', 'test1');

    // Assert
    expect(component.onSearch).toHaveBeenCalledWith('test1');
  });

  it('should call showDialog(undefined) when addEvent is emitted', () => {
    // Arrange
    spyOn(component, 'showDialog');
    fixture.detectChanges();
    const toolbar = fixture.debugElement.query(By.css('app-toolbar'));

    // Act
    toolbar.triggerEventHandler('addEvent');

    // Assert
    expect(component.showDialog).toHaveBeenCalledWith(undefined);
  });

  it('should display app-group-list when isDialogOpen is false', () => {
    // Arrange
    component.isDialogOpen = false;

    // Act & Assert
    fixture.detectChanges();
    const groupList = fixture.debugElement.query(By.css('app-group-list'));
    expect(groupList).toBeDefined();
  });
});
