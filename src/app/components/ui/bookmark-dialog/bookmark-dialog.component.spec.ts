import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarkDialogComponent } from './bookmark-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BookmarkDialogComponent', () => {
  let component: BookmarkDialogComponent;
  let fixture: ComponentFixture<BookmarkDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BookmarkDialogComponent, BrowserAnimationsModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            dialogTitle: 'Test',
            title: 'test',
            url: '',
            description: '',
          },
        },
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
