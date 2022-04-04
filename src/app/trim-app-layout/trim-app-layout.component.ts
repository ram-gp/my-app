import { Component, OnInit } from '@angular/core';
import { SearchClauseService } from '../services/search-clause.service';
@Component({
  selector: 'app-trim-app-layout',
  templateUrl: './trim-app-layout.component.html',
  styleUrls: ['./trim-app-layout.component.scss']
})
export class TrimAppLayoutComponent implements OnInit {
  SearchClause: any
  constructor( private service:SearchClauseService) { 
   
  }

  ngOnInit(): void {
    this.service.getAll()
        .subscribe(response => {
          this.SearchClause = response;
          //console.log(this.SearchClause);
        });
  }

}
