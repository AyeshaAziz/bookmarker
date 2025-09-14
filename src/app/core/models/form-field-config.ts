import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";

export interface FormFieldConfig {
  name: string;
  label: string;
  value: string;
  required?: boolean;
  type?: string;
  validators?: (ValidatorFn | AsyncValidatorFn)[];
}
