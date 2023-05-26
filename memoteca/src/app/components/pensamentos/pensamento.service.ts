import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) {}

  private getUrlId(id: number | string): string {
    return `${this.API}/${id}`;
  }

  list(): Observable<Pensamento[]> {
    return this.http.get<Pensamento[]>(this.API);
  }

  create(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  edit(pensamento: Pensamento): Observable<Pensamento> {
    let URL = this.API;
    if (pensamento.id) URL = this.getUrlId(pensamento.id);

    return this.http.put<Pensamento>(URL, pensamento);
  }

  del(id: number): Observable<Pensamento> {
    const URL = this.getUrlId(id);

    return this.http.delete<Pensamento>(URL);
  }

  getById(id: number): Observable<Pensamento> {
    const URL = this.getUrlId(id);

    return this.http.get<Pensamento>(URL);
  }
}
