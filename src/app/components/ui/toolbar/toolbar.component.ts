import { SearchbarComponent } from './../searchbar/searchbar.component';
import { SharedConstants } from './../../../shared/shared-constants';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIcon,
    MatFormFieldModule,
    SearchbarComponent,
  ],

  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  @Input() title: string = SharedConstants.EMPTY_STRING;
  @Input() searchLabel: string = SharedConstants.EMPTY_STRING;
  @Output() searchInputChanged = new EventEmitter();
  @Output() addEvent = new EventEmitter();

  searchTermChanged(value: string) {
    this.searchInputChanged.emit(value);
  }
   onClearClicked(): void {
    this.searchInputChanged.emit();
  }

  onAddClicked(): void {
    this.addEvent.emit();
  }
}
