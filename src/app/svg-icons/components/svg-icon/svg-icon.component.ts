import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit {
  @Input()
  name: string | undefined;

  constructor() {}

  ngOnInit(): void {
    if (!this.name) { throw new Error('Svg name is empty'); }
  }

}
