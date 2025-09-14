import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgFormComponent } from './ng-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedConstants } from '../../../shared/shared-constants';

describe('NgFormComponent', () => {
  let component: NgFormComponent;
  let fixture: ComponentFixture<NgFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgFormComponent, BrowserAnimationsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NgFormComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      title: new FormControl(SharedConstants.EMPTY_STRING, Validators.required),
      url: new FormControl(SharedConstants.EMPTY_STRING, [Validators.required]),
      description: new FormControl(SharedConstants.EMPTY_STRING),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
