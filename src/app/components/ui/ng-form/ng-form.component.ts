import { SharedConstants } from './../../../shared/shared-constants';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormFieldConfig } from '../../../core/models/form-field-config';
import { FormHelper } from './form-helper';

@Component({
  selector: 'app-ng-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './ng-form.component.html',
  styleUrl: './ng-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgFormComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() formFields!: FormFieldConfig[];
  @Input() label!: string;
  @Output() submitForm = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  FormHelper = FormHelper;

  ngOnInit() {
    this.formFields?.forEach((field) => {
      const validators = field.required
        ? [Validators.required, ...(field.validators || [])]
        : field.validators || [];
      this.formGroup.addControl(
        field.name,
        new FormControl(SharedConstants.EMPTY_STRING, validators)
      );
    });
  }

  onCancel(): void {
    this.cancelEvent.emit();
  }
}
