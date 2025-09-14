import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupListComponent } from './group-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../../store/reducer';
import { getFilteredBookmarks, getLoading } from '../../../store/selectors';

describe('GroupListComponent', () => {
  let component: GroupListComponent;
  let fixture: ComponentFixture<GroupListComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GroupListComponent],
      providers: [
              provideMockStore({
                initialState,
                selectors: [
                  { selector: getFilteredBookmarks, value: [] },
                  { selector: getLoading, value: false },
                ],
              }),
            ],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should select filtered bookmarks from the store', (done) => {
  store.select(getFilteredBookmarks).subscribe((value) => {
    expect(value).toEqual([]);
    done();
  });
});
});
