import { FormFieldConfig } from '../../../core/models/form-field-config';
import { SharedConstants } from './../../../shared/shared-constants';
import { FormGroup } from '@angular/forms';

export class FormHelper {
  private static errorPriority = ['required', 'pattern'];

  static getErrors(form: FormGroup, fieldName: string): string[] {
    const control = form.get(fieldName);
    return control?.errors ? Object.keys(control.errors) : [];
  }

 static getFirstError(form: FormGroup, fieldName: string): string | null {
  const control = form.get(fieldName);
  if (!control || !control.errors) return null;
  if (!(control.touched || control.dirty)) return null;

  const errors = Object.keys(control.errors);
  const priority = this.errorPriority.find(err => errors.includes(err));

  return priority ?? errors[SharedConstants.ZERO];
}


  static getErrorMessage(field: FormFieldConfig, errorKey: string): string {
    switch (errorKey) {
      case 'required':
        return `${field.label} is required`;
      case 'pattern':
        return field.name === 'url' ? 'Invalid URL' : 'Invalid format';
      default:
        return 'Invalid value';
    }
  }
}
