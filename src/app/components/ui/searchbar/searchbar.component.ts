import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SharedConstants } from '../../../shared/shared-constants';
import { MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchbar',
  imports: [
    MatFormField,
    MatIconButton,
    MatInputModule,
    MatIconModule,
    CommonModule,
],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SearchbarComponent {
  @Input() label: string = SharedConstants.EMPTY_STRING;
  @Output() inputChanged = new EventEmitter();
  @Output() addEvent = new EventEmitter();

  onInputChanged(input: HTMLInputElement): void {
    this.inputChanged.emit(input.value);
  }

  onClearClicked(input: HTMLInputElement): void {
    this.inputChanged.emit();
    input.value = SharedConstants.EMPTY_STRING;
  }

  onAddClicked(): void {
    this.addEvent.emit();
  }
}
