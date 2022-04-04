import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchClause } from '../model/search-clause.model';
const baseUrl = 'http://localhost/ServiceApi/SearchClauseDef?TrimType=record&ResultsOnly=true&format=json';
const httpOptions : any    = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
     'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With;',
    'Access-Control-Allow-Origin': 'http://localhost',
    'Access-Control-Expose-Headers': '*',
    'preflightContinue': 'false' 
  })
};
@Injectable({
  providedIn: 'root'
})
export class SearchClauseService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<SearchClause[]> {
    return this.http.get<SearchClause[]>(baseUrl, { 'headers':httpOptions.headers });
  }  
}
