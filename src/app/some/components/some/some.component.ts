import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { SomeToken } from "../../some.module";

@Component({
  selector: 'app-some',
  templateUrl: './some.component.html',
  styleUrls: ['./some.component.scss']
})
export class SomeComponent implements OnInit {
  constructor(
    @Inject(SomeToken) private token: string
  ) { }

  ngOnInit(): void {
    // console.log(this.someToken);
    // const token = this.injector.get(SomeToken);
  }

}
