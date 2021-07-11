import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DatepickerOverlayService} from "../../services/datepicker-overlay.service";

@Component({
  selector: 'app-datepicker-input',
  templateUrl: './datepicker-input.component.html',
  styleUrls: ['./datepicker-input.component.scss']
})
export class DatepickerInputComponent implements OnInit {
  @ViewChild('datepicker', {read: ElementRef}) private datepicker!: ElementRef;
  @ViewChild('btn', {read: ElementRef}) private btn!: ElementRef;

  constructor(
    private datepickerOverlayService: DatepickerOverlayService
  ) {}
  public open(): void {
    this.datepickerOverlayService.open(this.datepicker);
  }

  ngOnInit(): void {
  }

}
