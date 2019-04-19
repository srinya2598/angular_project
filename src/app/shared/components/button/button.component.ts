import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonType } from '../../utils/constants';

@Component({
  selector: 'ec-button',
  styleUrls: ['./button.component.scss'],
  template: `
    <button ngClass.xs="btn-xs"
            ngClass.sm="btn-xs"
            ngClass.md="btn-md"
            [ngClass]="{'button-outline':outline}"
            [type]="type"
            [class]="getButtonClass()"
            (click)="emitClickEvent()">
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent implements OnInit {

  @Input() status: ButtonType = ButtonType.PRIMARY;
  @Input() type = 'button';
  @Input() outline = false;
  @Output() clicked: EventEmitter<any>;

  constructor() {
    this.clicked = new EventEmitter();
  }

  ngOnInit() {
  }

  emitClickEvent() {
    this.clicked.emit();
  }

  getButtonClass() {
    switch (this.status) {
      case ButtonType.ERROR:
        return 'button-error';
      case ButtonType.SUCCESS:
        return 'button-success';
      default:
        return;
    }
  }
}
