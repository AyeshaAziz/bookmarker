import { FormFieldConfig } from './../../../core/models/form-field-config';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedConstants } from '../../../shared/shared-constants';
import { NgFormComponent } from '../ng-form/ng-form.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-bookmark-dialog',
  standalone: true,
  imports: [NgFormComponent],
  templateUrl: './bookmark-dialog.component.html',
  styleUrl: './bookmark-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkDialogComponent implements OnInit {
  bookmarkForm: FormGroup = new FormGroup({});
  formFieldsConfig!: FormFieldConfig[];
  dialogData = inject(MAT_DIALOG_DATA);
  icon = 'bookmark_outlined';

  private iconUrl = 'assets/icons/bookmark_outlined.svg';
  private dialogRef = inject(MatDialogRef<BookmarkDialogComponent>);
  private urlRegex = /https?:\/\/.+/;
  private matIconReg = inject(MatIconRegistry);
  private domSanatiser = inject(DomSanitizer);

  constructor() {
    this.registerIcon();
    this.setFormFieldConfig();
  }

  ngOnInit() {
    this.initFormFields();
  }

  closeDialog() {
    this.dialogRef.close(this.bookmarkForm.value);
  }

  private registerIcon():void{
    this.matIconReg.addSvgIcon(
      this.icon,
      this.domSanatiser.bypassSecurityTrustResourceUrl(this.iconUrl)
    );
  }

  private initFormFields(): void {
    this.formFieldsConfig.forEach((field) => {
      this.bookmarkForm.addControl(
        field.name,
        new FormControl(field.value, field.validators || [])
      );
    });
  }

  private setFormFieldConfig(): void {
    this.formFieldsConfig = [
      {
        name:'id',
        value: this.dialogData?.id || null
      },
      {
        name: 'title',
        label: 'Title',
        type: 'text',
        required: true,
        value: this.dialogData?.title || SharedConstants.EMPTY_STRING,
        validators: [Validators.required],
      },
      {
        name: 'url',
        label: 'URL',
        type: 'text',
        required: true,
        value: this.dialogData?.url || SharedConstants.EMPTY_STRING,
        validators: [Validators.required, Validators.pattern(this.urlRegex)],
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        required: false,
        value: this.dialogData?.description || SharedConstants.EMPTY_STRING,
      },
    ] as FormFieldConfig[];
  }
}
