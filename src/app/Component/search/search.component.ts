import { Component, OnInit } from '@angular/core';
import { UxaTextInputModule } from "@ux-aspects-angular/text-input";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  disabled: Boolean = false;
  search: any;
  constructor() { }

  ngOnInit(): void {
  }

}
