import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {Item, LivroResultado} from "../models/livro";

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'

  constructor(private http: HttpClient) {
  }

  search(value: string): Observable<LivroResultado> {
    const params = new HttpParams().append('q', value)

    return this.http.get<LivroResultado>(this.API, {params})
      // .pipe(
      //   map((res) => res.items ?? []),
      // )
  }
}
